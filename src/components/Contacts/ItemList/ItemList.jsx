import { Component } from 'react'; 
import style from '../Contacts.module.scss'
import uniqid from 'uniqid';

class ItemList extends Component {
    
    constructor(props){
        super(props);
        const { id, ...rest} = this.props.userData;
        

        this.state = {
            id: id,
            renderData : rest
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleDeleteItem(this.state.id);
    }

    
    render() {
        return (
					<tr className={style.usersList__contentList}>
                       {Object.keys(this.state.renderData).map(key => (
                            <td className={style.usersList__contentList_item} key={uniqid()}>{this.state.renderData[key]}</td>
                        ))}
                        <td className={style.usersList__contentList_item}>
                            <button className={style.usersList__contentList_btn} onClick={() => this.handleClick()}>Видалити контакт</button>
                        </td>
					</tr>
				);
    }
}


export default ItemList;