import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { UseForm } from './Hooks/useForm';

function App() {
  const [cantvDown, setCantvDown] = useState(null);
  const [cantvUp, setCantvUp] = useState(null);
  const [report, setReport] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [businessSet, setBusiness] = useState("none");
  let [isonline, setIsOnline] = useState(navigator.onLine);
  let [reportCreation, setReportCreation] = useState(false);
  useState(() => {
    getTodayDate();
  });

  const [formValues, handleInputChange] = UseForm({
    business: '',
  });
  const { business } = formValues;

  useEffect(() => {
    window.addEventListener('offline', cantvIsDown);
    window.addEventListener('online', cantvIsUp);
    if (reportCreation) {
      createReport();
    }
  }, [reportCreation]);

  function getTodayDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const todayis = [day, month, year].join('/');
    setCurrentDate(todayis);
  }

  function createReport() {
    let data = { down: cantvDown, up: cantvUp };
    let newReport = report;
    newReport.push(data);
    setReport(newReport);
    setReportCreation(false);
  }

  function getTime() {
    var today = new Date();
    var seconds = String(today.getSeconds()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    var time = today.getHours() + ":" + minutes + ":" + seconds;
    return time;
  }

  function cantvIsUp() {
    let time = getTime();
    setCantvUp(time);
    setReportCreation(true);
  }

  function cantvIsDown() {
    let time = getTime();
    setCantvDown(time);
  }

  function saveBusinessName(e) {
    e.preventDefault();
    setBusiness(business);
  }

  return (
    <>
      <div id="conexion">
        <div className="current_date">
          {
            businessSet === "none" ?
              <>
                <div className="form-business">
                  <form><h2>Nombre companía</h2><input type="text" name="business" onChange={handleInputChange}></input><button onClick={saveBusinessName}>Guardar</button></form>
                </div>
              </>

              :
              <h1>Fallas Internet {businessSet} {currentDate}</h1>
          }

        </div>
        {
          <table id="cantvdata">
            <thead>
              <tr>
                <th className="head">Perdida de internet</th>
                <th className="head">Hora de regreso</th>
              </tr>
            </thead>
            <tbody>
              {
                report.map((re, index) => {
                  return <tr key={index}>
                    <td>{re.down}</td>
                    <td>{re.up}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        }
      </div>
      <div className="message">
        <h3>Cómo usar:</h3>
        <p>Paso 1: Ingresar nombre de su proveedor de internet</p>
        <p>Paso 2: Dejar la página abierta en un pestaña en su explorador</p>
        <p>Paso 3: Seguir con tu vida normal!</p>
        <p>Si quieren compartir el reporte de fallas deben tomar una captura de pantalla.</p>
        <h3>Qué es esto?</h3>
        <p>Esta idea nació porque durante las últimas seis semanas el servicio de Internet de CANTV a sido terrible, este servicio no es gratis. Actualmente pago una mensualidad de 22$ por un servicio de 14mb que en un buen día llega a 6mb.</p>  
        <p>Ya me ladille de que a los Venezolanos nos esten metiendo el dedo y además nos las tengamos que calar, la verdad no se si esto marcará una diferencia a nivel de servicio pero vamos a poder dejar en evidencia a los proveedores y los servicios que ofrecen.</p>
        <h3>Por hacer:</h3>
        <p>Botón que cree una imagen con la tabla para compartirlo por las redes sociales</p>
      </div>  
    </>
  );
}

export default App;
