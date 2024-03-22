
import { Component } from 'react';
import Contacts from '../Contacts';
import style from './Main.module.scss';
import {formatPhoneNumber,formatName,formatSurname} from '../../utils/helpers'

class Main extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            contactsData : [],
        }

    }

    
    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cервер ушел за печенькой');
            }
            return response.json();
        })
        .then(data => {
            this.setState({ contactsData: data.map(item => 
                                            ({
                                                id: item.id,
                                                name: formatName(item.name),
                                                surname: formatSurname(item.name),
                                                phone: formatPhoneNumber(item.phone.split(' ')[0])
                                            }))
            })
        })
        .catch(error => {
            alert('Не удалось получить данные');
        });
    }

    render() {
        return (
					<section className={style.main}>
                        <Contacts 
                            contactsData={this.state.contactsData}
                        />
					</section>
				);
    }
}


export default Main;