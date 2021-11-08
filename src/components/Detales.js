import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Detales = observer(() => {
    const history = useLocation();   
    const currentCoin = history.state.data;
    return (
        <div className="container">
            <h2>Detales</h2>
            <div className="link-btn">
                <Link to='/'>Назад</Link>
            </div>
            <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{currentCoin.name}</td>
                        </tr>
                        <tr>
                            <td>Rank</td>
                            <td>{currentCoin.rank}</td>
                        </tr>
                        <tr>
                            <td>Symbol</td>
                            <td>{currentCoin.symbol}</td>
                        </tr>
                        <tr>
                            <td>Price, USD</td>
                            <td>{currentCoin.priceUsd}</td>
                        </tr>
                        <tr>
                            <td>Change per 24H, %</td>
                            <td>{currentCoin.changePercent24Hr}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>{currentCoin.explorer}</td>
                        </tr>
                    </tbody>
            </table>
        </div>
    )
})
export default Detales;
