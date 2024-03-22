
import { Component } from 'react';
import Contacts from '../Contacts';
import style from './Main.module.scss';
import uniqid from 'uniqid';
import {formatPhoneNumber,formatName,formatSurname} from '../../utils/helpers'

class Main extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userData : [],
            userData2: []
        }

    }

    

    componentDidMount() {
        const getDataUser = new Promise((resolve,reject) => {
            fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => {
                if (!response.ok){
                   reject(new Error('Cервер ушел за печенькой'));
                } else resolve(response);
            })
            .catch(error => {
                alert('Не удалось получить данные');
            })
        });
        
       getDataUser.catch(alert);
        
       getDataUser.then((response) => {
            return response.json();
        }).then((data) => {
            const dataMap = data.map((item) => {

                return {
                    id : item.id,
                    name : formatName(item.name),
                    surname : formatSurname(item.name),
                    phone : formatPhoneNumber(item.phone.split(' ')[0]),
                };
            });

            const newDataMap = data.map((item) => {
                return {
                    id: item.id,
                    username : item.username,
                    email : item.email,
                    phone : formatPhoneNumber(item.phone.split(' ')[0]),
                    city : item.address.city,
                    zipcode : item.address.zipcode
                };
            });

            this.setState({ 
                userData : dataMap,
                userData2 : newDataMap
             });
        });
    }

    render() {
        return (
					<section className={style.main}>
                       <Contacts 
                            key={`contacts-${uniqid()}`}
                            userData= {this.state.userData}
                            defaultField = {["Ім'я","Прізвище","Телефон"]}
                       />
                       <Contacts 
                            key={`contacts-${uniqid()}`}
                            userData = {this.state.userData2}
                            defaultField = {["Псевдонім","Імейл","Телефон","Місто","Поштовий індекс"]}
                       />
					</section>
				);
    }
}


export default Main;