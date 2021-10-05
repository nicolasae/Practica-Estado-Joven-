import React,{ useState } from "react";
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CTooltip,
  CDataTable,
  CCollapse,
  CCardFooter,
  CButton,
  CButtonGroup,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";

import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'
import '../../scss/_custom.scss'

  // hook personalizado
const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

const Inscritos = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsData,setYearsData] = React.useState([])
    // Constantes para inscritos general
    const [yearSelected, setYearSelected] = React.useState(new Date().getFullYear())
    const [inscritosPrimer, setInscritosPrimer] = React.useState([])
    const [collapseTablaInscritosPrimer, setCollapseTablaInscritosPrimer] = useState(false)
    const fieldsInscritos = ['COD_PERIODO','ESTUDIANTES','ESTRATO','SEXO','TIPO_INSCRIPCION','TIPO_COLEGIO']
    const [inscritosSegundo, setInscritosSegundo] = React.useState([])
    const [collapseTablaInscritosSegundo, setCollapseTablaInscritosSegundo] = useState(false)
    

    // Funciones 
    const getYears = async() => { 
        for (var i=actualYear;i>= 2010; i--){
            yearsData.push(i)
        }
        setYearsData(yearsData)
    }

    const getDataInscritosPrimerSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-1',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosPrimer(inscritosquery)
        console.log(inscritosPrimer)

    }

    const getDataInscritosSegundoSemestre = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/tendencia?VAR=Primer curso&COD_PERIODO='+ yearSelected +'-2',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const inscritosquery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setInscritosSegundo(inscritosquery)
        

    }

    React.useEffect(async () => { await getDataInscritosPrimerSemestre()}, [yearSelected])
    React.useEffect(async () => { await getDataInscritosSegundoSemestre()}, [yearSelected])



    const toggleTablaInscritosPrimer = (e)=>{
        setCollapseTablaInscritosPrimer(!collapseTablaInscritosPrimer);
        setCollapseTablaInscritosSegundo(false);
        e.preventDefault();
    }
    const toggleTablaInscritosSegundo = (e)=>{
        setCollapseTablaInscritosPrimer(false);
        setCollapseTablaInscritosSegundo(!collapseTablaInscritosSegundo);
        e.preventDefault();
    }

    const handleChangeYear = async (event) =>  {
        setYearSelected(event.target.value);
        console.log(yearSelected)

    }
    // despues de definir las constantes 
    useSingleton(async () => {
        await getYears();    
        await getDataInscritosPrimerSemestre()
        await getDataInscritosSegundoSemestre()

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Inscritos</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    Los estudiantes de <b>inscritos</b> son .
                </p>                
                
            </CCardBody>
        </CCard>
        <CRow>
            <CCol xs="12" lg="12">
                <CCard>
                    <h1 style={{textAlign: 'center', fontWeight:'bold'}}>
                        Tabla de Estudiantes Inscritos General:
                    </h1>
                    <CCollapse show={collapseTablaInscritosPrimer}>  
                        <CCardBody>
                            <CDataTable
                                items={inscritosPrimer}
                                fields={fieldsInscritos}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCollapse show={collapseTablaInscritosSegundo}>  
                        <CCardBody>
                            <CDataTable
                                items={inscritosSegundo}
                                fields={fieldsInscritos}
                                itemsPerPage={5}
                                pagination
                                columnFilter
                            />
                        </CCardBody>
                    </CCollapse>
                    <CCardFooter>
                        <CLabel >Año:</CLabel>
                        <CFormGroup row>
                            <CCol md="3">
                                <CSelect value={yearSelected} onChange={handleChangeYear}>
                                    {yearsData.map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })}
                                </CSelect>
                            </CCol>
                            <CCol md="2">
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaInscritosPrimer} 
                                    className={'mb-1'}
                                >{yearSelected + '-1'}
                                </CButton>
                                <CButton
                                    color="outline-primary"
                                    onClick={toggleTablaInscritosSegundo} 
                                    className={'mb-1'}
                                >{yearSelected + '-2'}
                                </CButton>
                            </CCol>
                        </CFormGroup>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
        


       
        </>
    )
}

export default Inscritos