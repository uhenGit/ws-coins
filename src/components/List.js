import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import coinStore from '../store/coinStore';

const List = observer(() => {
    const socketStart = () => {
    	coinStore.startSocket();
    	coinStore.readSocket()
    };
    const socketStop = () => {
    	coinStore.stopSocket()
    };
    let coins = toJS(coinStore.coins);
    return (
        <div className="container">
            <h2>Coins List</h2>
            <button onClick={socketStop}>Stop</button>
            <table>
                <tbody>
                {
                    coins.map((item) => {
                        return (
                            <tr key={item.id}>        
                                <td title="Click for detales">
                                    <Link to={`/detales/id:${item.id}`} state={{data: item}}>
                                            {item.id}
                                    </Link>
                                </td>
                                <td>
                                    {item.priceUsd}
                                </td>        
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <button onClick={socketStart}>Run</button>
        </div>
    )
})
export default List
