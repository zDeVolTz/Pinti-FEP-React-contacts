import { Component } from 'react';
import ItemList from './ItemList'; 
import style from './Contacts.module.scss'
import uniqid from 'uniqid';

class Contacts extends Component {
    constructor(props){
        super(props);

        this.state = {
            userData : this.props.userData,
            isActive : false,
            newInputData: {},
            defaultField : this.props.defaultField
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

    }

   

    handleSubmit() {
        if(Object.keys(this.state.newInputData).length === this.state.defaultField.length) {
            const newId = uniqid();
            this.setState(prevState => ({
                userData : [...prevState.userData, { ...prevState.newInputData, id: newId }],
                newInputData: {},
                isActive : false
          }))
        }
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState(prevState => ({
            newInputData: {
                ...prevState.newInputData,
                [id] : value
            }
        }));
    }
   
    handleDeleteItem(id) {
        this.setState(prevState => {
            const updatedUserData = [...prevState.userData];
            updatedUserData.splice(updatedUserData.findIndex(item => item.id === id), 1);
            return {
                userData: updatedUserData
            }
        })
    }

    handleClick() {
        this.setState(prevState => ({isActive : !prevState.isActive}))
    }

    render() {
        return (
					<section className={style.contacts}>
                        <div className={`${style.usersList} ${this.state.userData.length === 0 ? style.hidden : ''}`}>
                            <table className= {style.usersList__table}>
                                <tbody className={style.usersList__block}>
                                    <tr className={style.usersList__header}>
                                        {this.state.defaultField.map(element => (
                                            <th key={`usersList__header-${element}`} className={style.usersList__headerTitle}>{element}</th>
                                        ))}
                                    </tr>
                                    {this.state.userData.map((element) => (
                                        <ItemList
                                            key={`usersList-${element.id}`}
                                            userData={element}
                                            handleDeleteItem={this.handleDeleteItem}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={style.contactForm}> 
                            <button className={`${style.contactForm__btn_show} ${this.state.isActive && style.hidden}`} onClick={this.handleClick}>Додати новий контакт</button>
                            <div className={`${style.contactForm__block} ${!this.state.isActive && style.hidden}`}>
                                <h2 className={style.contactForm__title}>Новий контакт</h2>
                                {this.state.defaultField.map(element => (
                                    <div key={`contactForm__item-${element}`} className={style.contactForm__item}>
                                        <label htmlFor={`${element}`} className={style.contactForm__label}>{element}</label> 
                                        <input 
                                            id= {`${element}`} 
                                            type="text"
                                            value={this.state.newInputData[element] || ''} 
                                            className={style.contactForm__input}
                                            placeholder={`Введіть ${element}`} 
                                            onChange={this.handleChange}
                                        /> 
                                    </div>
                                ))}
                                <div className={style.contactForm__btns}>
                                    <button className={style.contactForm__btn} onClick={this.handleSubmit}>Зберегти</button>
                                    <button className={style.contactForm__btn} onClick={this.handleClick}>Скасувати</button>
                                </div>
                            </div>
                        </div>
					</section>
				);
    }
}


export default Contacts;