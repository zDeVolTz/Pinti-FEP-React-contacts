import { Component } from 'react';
import style from './Contacts.module.scss'
import uniqid from 'uniqid';

class Contacts extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            contactsData : this.props.contactsData,
            isActive : false,
            newInputData: {}
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.contactsData !== this.props.contactsData) {
            this.setState({ 
                contactsData : this.props.contactsData
             });
        }
    }

    handleSubmit() {
        if(Object.keys(this.state.newInputData).length === 3) {
            const newId = uniqid();
            this.setState(prevState => ({
                contactsData : [...prevState.contactsData, { ...prevState.newInputData, id: newId }],
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
            const updatedcontactsData = [...prevState.contactsData];
            updatedcontactsData.splice(updatedcontactsData.findIndex(item => item.id === id), 1);
            return {
                contactsData: updatedcontactsData
            }
        })
    }

    handleClick() {
        this.setState(prevState => ({isActive : !prevState.isActive}))
    }

    render() {
        return (
					<section className={style.contacts}>
                        <div className={`${style.usersList} ${this.state.contactsData.length === 0 ? style.hidden : ''}`}>
                            <table className= {style.usersList__table}>
                                <tbody className={style.usersList__block}>
                                    <tr className={style.usersList__header}>
                                        <th className={style.usersList__headerTitle}>Ім'я</th>
                                        <th className={style.usersList__headerTitle}>Прізвище</th>
                                        <th className={style.usersList__headerTitle}>Телефон</th>
                                    </tr>
                                    {this.state.contactsData.map(element => (
                                       <tr key={element.id} className={style.usersList__contentList}>
                                            <td className={style.usersList__contentList_item}>{element.name}</td>
                                            <td className={style.usersList__contentList_item}>{element.surname}</td>
                                            <td className={style.usersList__contentList_item}>{element.phone}</td>
                                            <td className={style.usersList__contentList_item}>
                                                <button className={style.usersList__contentList_btn} onClick={() => this.handleDeleteItem(element.id)}>Видалити контакт</button>
                                            </td>
                                       </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={style.contactForm}> 
                            <button className={`${style.contactForm__btn_show} ${this.state.isActive && style.hidden}`} onClick={this.handleClick}>Додати новий контакт</button>
                            <div className={`${style.contactForm__block} ${!this.state.isActive && style.hidden}`}>
                                <h2 className={style.contactForm__title}>Новий контакт</h2>
                                
                                <div className={style.contactForm__item}>
                                    <label htmlFor={'name'} className={style.contactForm__label}>Ім'я</label> 
                                    <input 
                                        id= 'name'
                                        type="text"
                                        value={this.state.newInputData['name'] || ''} 
                                        className={style.contactForm__input}
                                        placeholder={`Введіть Ім'я`} 
                                        onChange={this.handleChange}
                                    /> 
                                </div>
                                <div className={style.contactForm__item}>
                                    <label htmlFor={'surname'} className={style.contactForm__label}>Прізвище</label> 
                                    <input 
                                        id = 'surname'
                                        type="text"
                                        value={this.state.newInputData['surname'] || ''} 
                                        className={style.contactForm__input}
                                        placeholder={`Введіть Прізвище`} 
                                        onChange={this.handleChange}
                                    /> 
                                </div>
                                <div className={style.contactForm__item}>
                                    <label htmlFor={'phone'} className={style.contactForm__label}>Телефон</label> 
                                    <input 
                                        id = 'phone'
                                        type="text"
                                        value={this.state.newInputData['phone'] || ''} 
                                        className={style.contactForm__input}
                                        placeholder={`Введіть ваш номер`} 
                                        onChange={this.handleChange}
                                    /> 
                                </div>
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