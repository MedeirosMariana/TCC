import { useState } from 'react'
import { Container } from './styled'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


export default function AddSession (props) {
    const [currentDate, setCurrentDate] = useState();

    const [currentDate2, setCurrentDate2] = useState('');

    const [currentHour, setCurrentHour] = useState();

    const [dates, setDates] = useState([]);
    const [hours, setHours] = useState([]);

    const addDate = () => {
        let today = new Date();
        today = today.toISOString();
        today = today.split('T')[0];

        if(!currentDate) {
            toast.dark('😢 Não é possível adicionar uma data vazia')
            return;
        }

        if(currentDate < today) {
            toast.dark('😢 Não é possivel criar evento para os povos do passado')
            return;
        }
       
        let r = currentDate.split('-');
        let y = `${r[2]}/${r[1]}/${r[0]}`

        if(dates.some(item => 
            item == y
        )) 
            return;

        setDates([...dates, y])
    }

    const addHour = () => {

        var result = -1;

        if(hours.some((item, i) => {
            if(item.data == currentDate2) {
                result = i
            }
        }))
            return false;
            

        var z = [...hours]
            if(result != -1) {
                z[result] =         
                {
                    data: currentDate2,
                    horarios: [...z[result].horarios, currentHour]
                }
            
            }
            else {
                z.push(         
                {
                    data: currentDate2,
                    horarios: [currentHour]
                })
            }    
      

        setHours(z)

    }

    return (
        <Container>
            <ToastContainer />
            <div className="datePart"> 
                <div className="agp-input"> 
                    <label> Adicione uma data: </label>
                    <input type="date" onChange={e => setCurrentDate(e.target.value)}/>
                </div>

                <button onClick={addDate}> Adicionar Data </button>
            </div>
            <div className="HourPart">
                <select onChange={(e) => setCurrentDate2(e.target.value)}>
                    <option value={0}> Selecione uma data </option>
                    {dates.map(item =>{
                        return <option value={item}> {item} </option>
                    })}
                </select>
                <div className="agp-input"> 
                    <label> Adicione um horário para o dia selecionado: </label>
                    <input type="time" value={currentHour} onChange={e => setCurrentHour(e.target.value)}/>
                </div>

                <button onClick={addHour}> Adicionar horário </button>
            </div>

            <Link to={{
                pathname: '/addevent',
                state: hours
            }} > <button> Confirmar sessões </button> </Link>
        </Container>

    )
}