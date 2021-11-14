import React,{ useState } from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable,
    CCollapse,
    CButton,
    CFormGroup,
    CLabel,
    CSelect,
    CWidgetDropdown,
  } from "@coreui/react";
  
  import {
      CChartBar,
      CChartLine,
      CChartPie,
    } from '@coreui/react-chartjs'

 // hook personalizado
 const useSingleton = (callBack = () => { }) => { const hasBeenCalled = React.useRef(false);     if (hasBeenCalled.current) return;     callBack();     hasBeenCalled.current = true; }

 const DesercionInteranual = () =>{
    // constantes
    const actualYear = new Date().getFullYear()
    const [yearsDataSemestre,setYearsDataSemestre] = React.useState([])
    const [yearsData,setYearsData] = React.useState([])
    const [yearSelected, setYearSelected] = React.useState((new Date().getFullYear()-1));
    const [collapseGeneral, setCollapseGeneral] = useState(false);
    const [dataTablaDIA, setDataTablaDIA] = useState([])
    const fieldsTablaDIA = ['COD_PERIODO','NOMBRE','DURACION_SEMESTRES','ESTADO','CANTIDAD']
    const [collapseProgramas, setCollapseProgramas] = useState(false);
    const [dataYearsGeneral, setDataYearsGeneral] = React.useState({})
    const [loadingYearsGeneral, setLoadingYearsGeneral] = React.useState(false)
    const [dataYearsWidget, setDataYearsWidget] = React.useState([])
    const [dataPorcentajeYearsWidget, setDataPorcentajeYearsWidget] = React.useState([]);
    const [collapseDIAAnual,setCollapseDIAAnual] = useState(false);
    const [collapseGrafAnualPregrado,setCollapseGrafAnualPregrado] = useState(false);
    const [collapseGrafAnualPosgrado,setCollapseGrafAnualPosgrado] = useState(false);
    const [collapseProgramasPregrado,setCollapseProgramasPregrado] = useState(false);
    const [collapseProgramasPosgrado,setCollapseProgramasPosgrado] = useState(false);
    const fieldsTablaProgramas = [
        'COD_PERIODO',
        'NOMBRE',
        'NO_MATRICULADO',
        'PERMANECE_PROGRAMA',
        'CAMBIO_DE_PROGRAMA',
        'GRADUADO',
        'PORCENTAJE_NO_MATRICULADO',
        'PORCENTAJE_PERMANECE_PROGRAMA',
        'PORCENTAJE_CAMBIO_DE_PROGRAMA',
        'PORCENTAJE_GRADUADO',
        'TOTAL'
    ]
    const [tablaProgramasPregrado,setTablaProgramasPregrado] = React.useState([]);
    const [tablaProgramasPosgrado,setTablaProgramasPosgrado] = React.useState([]);

    // Funciones
    const getYears = async() => { 
        for (var i=2010;i<=actualYear-1; i++){
            yearsDataSemestre.push(i+'-1')
            yearsDataSemestre.push(i+'-2')
            yearsData.push(i)
        }
        setYearsData(yearsData)
        setYearsDataSemestre(yearsDataSemestre)
    }

    const getDataTablaDIA = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setDataTablaDIA(dataQuery)
    }

    const getDataYearsGeneral = async() =>{ 
        var estados= ['Graduado','No matriculado','Cambio de programa','Permanece programa']
        var axios = require('axios');
        var aux = {}
        var aux2 = []        
        for (var estado = 0;estado<estados.length;estado++){
            for (var year = 2010;year <= actualYear;year++){
                var config = {
                method: 'get',
                url: 'http://localhost:8000/api/desercionDIA_count?&COD_PERIODO='+year+'&ESTADO='+estados[estado],
                headers: { 
                    'Content-Type': 'application/json'
                },
                };
                const dataQuery = await axios(config)    
                .then( response => response.data.data)
                .catch(function (error) {
                    if(error.response.status === 404) {
                        return {CANTIDAD__sum:0}
                    }
                    else {
                        return error.response
                    }
                });
                aux2.push(dataQuery.CANTIDAD__sum)
            }
            aux[estados[estado]] = aux2
            aux2 = []
        }
        await setDataYearsGeneral(aux)
    }


    // const getDataYearsGeneral = async() =>{ 
    //     var estados= ['Graduado','No matriculado','Cambio de programa','Permanece programa']
    //     var axios = require('axios');
    //     let aux = dataYearsGeneral
    //     for (var estado = 0;estado<estados.length;estado++){
    //         var config = {
    //             method: 'get',
    //             url: 'http://localhost:8000/api/desercionDIA_count_year?ESTADO='+estados[estado],
    //             headers: { 
    //                 'Content-Type': 'application/json'
    //             },
    //         };
    //         var query = await axios(config)    
    //         .then( response => response.data.data)
    //         .catch(function (error) {
    //             if(error.response.status === 404) {
    //                 return {count:0}
    //             }
    //             else {
    //                 return error.response
    //             }
    //         });
    //         var aux2 = []
    //         for (const j in yearsDataSemestre ){
    //             for (const k in query){
    //                 if (yearsDataSemestre[j] === query[k].year){
    //                     aux2.push(query[k].count)
    //                 }
    //             }
    //         }
    //         aux[estados[estado]] = aux2
    //     }
    //     await setDataYearsGeneral(aux)
    //     setLoadingYearsGeneral(false)
    // }

    const getDataYearWidgetPregrado = async () => {
        var axios = require('axios');
        var estados = ['Graduado','Cambio de programa','Permanece programa','No matriculado']
        var aux = []
        var suma = 0
        for (var estado=0; estado < estados.length; estado++) {
            var config = {
            method: 'get',
            url: 'http://localhost:8000/api/desercionDIA_count?NIVEL=Pregrado&COD_PERIODO='+yearSelected+'&ESTADO='+estados[estado],
            headers: { 
                'Content-Type': 'application/json'
            },
            };
            const query = await axios(config)    
            .then( response => response.data.data)
            .catch(function (error) {
                console.log(error);
                return error.response
            });
            aux[estados[estado]] = query.CANTIDAD__sum;
            suma += query.CANTIDAD__sum
        }
        aux['suma']= suma      
        await setDataYearsWidget(aux)
        await widgetPregrado();
    }

    const widgetPregrado= async () => {
        let total = dataYearsWidget['suma']
        let permanece = ((dataYearsWidget['Permanece programa'])/total).toFixed(3);
        let cambio = ((dataYearsWidget['Cambio de programa'])/total).toFixed(3);
        let graduado = ((dataYearsWidget['Graduado'])/total).toFixed(3);
        let no_matriculado = ((dataYearsWidget['No matriculado'])/total).toFixed(3);
        // console.log(cambio,permanece,graduado,no_matriculado)
        var porcentajes_list = {}
        porcentajes_list = {
            permanece_porcentaje:permanece*100,
            cambio_porcentaje:cambio*100,
            graduado_porcentaje:graduado*100,
            no_matriculado_porcentaje:no_matriculado*100,
        }
        await setDataPorcentajeYearsWidget(porcentajes_list)
        setLoadingYearsGeneral(false)      
    }


    const getDataTablaProgramasPregrado = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA_estados?NIVEL=Pregrado',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setTablaProgramasPregrado(dataQuery)
    }
    const getDataTablaProgramasPosgrado = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'http://localhost:8000/api/desercionDIA_estados?NIVEL=Posgrado',
        headers: { 
            'Content-Type': 'application/json'
        },
        };
        const dataQuery = await axios(config)    
        .then( response => response.data.data)
        .catch(function (error) {
            console.log(error);
            return error.response
        });
        await setTablaProgramasPosgrado(dataQuery)
    }


    

  
    React.useEffect(async () => { 
        await getDataYearWidgetPregrado()
    },[yearSelected])

    const handleChangeYear = async (event) => {
        setYearSelected(event.target.value);
        setLoadingYearsGeneral(true)

    };     

    const toggleGeneral = (e)=>{
        setCollapseGeneral(!collapseGeneral);
        setCollapseProgramas(false);
        setCollapseDIAAnual(false);
        e.preventDefault();
    }
    const toggleProgramas = (e)=>{
        setCollapseProgramas(!collapseProgramas);
        setCollapseGeneral(false);
        setCollapseDIAAnual(false);
        e.preventDefault();
    }
    
    const toggleAnual = (e)=>{
        setCollapseDIAAnual(!collapseDIAAnual);
        setCollapseGeneral(false);
        setCollapseProgramas(false);
        e.preventDefault();
    }

    const toggleGraficoAnualPregrado= (e)=>{
        setCollapseGrafAnualPregrado(!collapseGrafAnualPregrado);
        setCollapseGrafAnualPosgrado(false);
        e.preventDefault();
    }
    const toggleGraficoAnualPosgrado= (e)=>{
        setCollapseGrafAnualPosgrado(!collapseGrafAnualPosgrado);
        setCollapseGrafAnualPregrado(false);
        e.preventDefault();
    }

    const toggleProgramasPregrado= (e)=>{
        setCollapseProgramasPregrado(!collapseProgramasPregrado);
        setCollapseProgramasPosgrado(false);
        e.preventDefault();
    }
    const toggleProgramasPosgrado= (e)=>{
        setCollapseProgramasPosgrado(!collapseProgramasPosgrado);
        setCollapseProgramasPregrado(false);
        e.preventDefault();
    }

    // despues de definir las constantes
    useSingleton(async () => {
        await getYears();
        await getDataTablaDIA();
        await getDataYearsGeneral();
        await getDataYearWidgetPregrado(); 
        await getDataTablaProgramasPregrado();      
        await getDataTablaProgramasPosgrado();      

    });

    return(
        <>
        <h1 style={{textAlign: 'center', fontWeight:'bold'}}>Deserción Interanual</h1>  
        <CCard>
            <CCardBody>
                <p className="text-muted">
                Para tener en cuenta:
                </p>
                <p className="muted">
                    <b>Definición: </b>La deserción interanual representa el porcentaje de 
                    estudiantes matriculados en un periodo académico que se ausentan de la 
                    institución durante dos periodos consecutivos.
                </p>
                    El ministerio de Educación Nacional define este porcentaje: 
                    <b> No matriculados / (Matrícula total del semestre)</b> teniendo en cuenta
                    las siguientes consideraciones:
                <p>
                <p></p>
                    <b>Período base (n): </b>Período para el cuál se está calculando la deserción.
                <p></p>
                    <b>Graduado: </b> Estudiante que esta matrículado en el período base <b>(n)</b>
                    que obtiene su título en el mismo período base <b>(n)</b>, o en alguno de los
                    semestres siguientes <b>(n+1</b>o <b>n+2)</b> Nota: Este valor no coincide con el
                    total de graduados en un período, porque se toman 3 períodos de observación
                    <b>(n,n+1</b> y <b>n+2)</b>.
                <p></p>
                    <b>Permanece Programa: </b>Estudiantes que estaba matriculado en <b>n </b> y está 
                    matriculado en el periodo <b>n+1 </b>o <b>n+2</b> sin cambiar de programa académico.
                <p></p>
                    <b>Cambio de  Programa: </b>Estudiantes que estaba matriculado en <b>n </b> y está 
                    matriculado en el periodo <b>n+1 </b>o <b>n+2</b> en otro programa académico
                <p></p>
                    <b>No matriculado: </b>Estudiantes que estaba matriculado en <b>n </b> y no aparece con
                    estado Graduado o Permanece programa o Cambio programa.
                </p>
            </CCardBody>
        </CCard>

        <CCard> 
            <div className="container">
                <h3 style={{textAlign: 'center', fontWeight:'bold'}}> Seleccione una de las siguientes opciones:</h3>           
                <div className="row " style={{marginTop:'2%',marginBottom:'2%'}} >                                                          
                    <div className="col justify-content-center" >
                        <CButton
                            color="outline-primary"
                            onClick={toggleGeneral} 
                            style={{marginLeft:'5%',marginRight:'3%'}}
                        >Mostrar Información Histórica
                        </CButton>  
                        <CButton
                            color="outline-success"
                            onClick={toggleAnual} 
                            style={{marginLeft:'5%',marginRight:'3%'}}
                        >Mostrar Información Anual
                        </CButton>  
                        <CButton
                            color="outline-info"
                            onClick={toggleProgramas} 
                            style={{marginLeft:'5%',marginRight:'3%'}}
                        >Mostrar Información por Programa
                        </CButton>
                    </div>                                          
                </div>
            </div>
        </CCard>
        <CCard>
            <CCollapse show={collapseGeneral}>
                
                    <CCardBody>
                        <h3 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Tabla histórica de estudiantes por estado:
                        </h3>
                        <CDataTable
                            items={dataTablaDIA}
                            fields={fieldsTablaDIA}
                            itemsPerPage={6}
                            pagination
                            columnFilter
                            align='middle'
                            color='primary'
                            borderColor="dark"
                            bordered={true}
                        >  
                        </CDataTable>
                        <h3 style={{textAlign: 'center', fontWeight:'bold'}}>
                            Histórico deserción interanual : 
                        </h3>
                    <CCardBody>
                        <CChartLine
                        datasets={[
                        
                        {   
                            label: 'Graduado',
                            fill:false,
                            borderColor: 'Red',
                            backgroundColor: 'Red',
                            data: dataYearsGeneral['Graduado'],
                        },
                        {
                            label: 'Cambio de programa',
                            backgroundColor: 'Green',
                            fill:false,
                            borderColor: 'Green',
                            data: dataYearsGeneral['Cambio de programa']
                        },
                        {
                            label: 'No matriculado',
                            backgroundColor: 'Blue',
                            borderColor: 'Blue',
                            fill:false,
                            data: dataYearsGeneral['No matriculado']
                        },
                        {
                            label: 'Permanece programa',
                            backgroundColor: 'Yellow',
                            borderColor: 'Yellow',
                            fill:false,
                            data: dataYearsGeneral['Permanece programa']
                        },
                        ]}
                        options={{
                        tooltips: {
                            enabled: true
                        }                        
                        }}
                        labels= {yearsData}                        
                    />
                    </CCardBody>                    
                </CCardBody>
            </CCollapse>
            <CCollapse show={collapseDIAAnual}>               
                    <CCardBody>                       
                        <div className="container">
                        <h1 style={{marginTop:'3%',textAlign: 'center',color: '#2eb85c'}}>
                            Desercion Interanual Facultad de Ingenierías
                        </h1> 
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col-2">
                                    <CSelect value={yearSelected} onChange={handleChangeYear}>
                                        {yearsData.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </CSelect>    
                                </div>
                                <div className="col">
                                    <CButton
                                        color="outline-success"
                                        onClick={toggleGraficoAnualPregrado}                                         
                                        >Graficar Pregrado
                                    </CButton>
                                    <CButton
                                        color="outline-success"
                                        onClick={toggleGraficoAnualPosgrado} 
                                        style={{marginLeft:'2%'}}
                                        >Graficar Posgrado
                                    </CButton>
                                </div>
                                   
                            </div>
                        </div>
                        </CCardBody>
                        <CCollapse show={collapseGrafAnualPregrado}>
                            <CCardBody>
                                {loadingYearsGeneral? 
                                    <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> :
                                    <div>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Nivel elegido: 
                                        </h2>                           
                                        <h2 style={{color: '#2eb85c',textAlign: 'center'}}>
                                            Pregrado
                                        </h2>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Desercion Período {yearSelected} 
                                        </h2>
                                        <CRow>
                                            <CCol lg="1"></CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-primary"
                                                header={dataPorcentajeYearsWidget['permanece_porcentaje']+'%'}
                                                text="Permanece en programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-success"
                                                header={dataPorcentajeYearsWidget['cambio_porcentaje']+'%'}
                                                text="Cambia de programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-warning"
                                                header={dataPorcentajeYearsWidget['graduado_porcentaje']+'%'}
                                                text="Graduado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-danger"
                                                header={dataPorcentajeYearsWidget['no_matriculado_porcentaje']+'%'}
                                                text="No Matriculado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-dark"
                                                header={dataYearsWidget['suma']}
                                                text="Total Estudiantes"
                                                ></CWidgetDropdown>
                                            </CCol>
                                        </CRow>
                                        <CChartPie
                                            datasets={[
                                            {
                                                backgroundColor: [
                                                '#321fbd',
                                                '#39f',
                                                '#f9b115',
                                                '#e55353',
                                                ],
                                                data: [
                                                    dataYearsWidget['Permanece programa'],
                                                    dataYearsWidget['Cambio de programa'],
                                                    dataYearsWidget['Graduado'],
                                                    dataYearsWidget['No matriculado'],
                                                ]
                                            }
                                            ]}
                                            labels={['Permanece programa','Cambio de programa','Graduado','No matriculado']}
                                            options={{
                                            tooltips: {
                                                enabled: true
                                            }
                                            }}
                                        />                         
                                    </div>
                                    
                                }        
                            </CCardBody>
                        </CCollapse>
                        <CCollapse show={collapseGrafAnualPosgrado}>
                            <CCardBody>
                                {loadingYearsGeneral? 
                                    <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> :
                                    <div>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Nivel elegido: 
                                        </h2>                           
                                        <h2 style={{color: '#2eb85c',textAlign: 'center'}}>
                                            Posgrado
                                        </h2>
                                        <h2 style={{marginTop:'1%',textAlign: 'center'}}>
                                            Desercion Período {yearSelected} 
                                        </h2>
                                        <CRow>
                                            <CCol lg="1"></CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-primary"
                                                header={dataPorcentajeYearsWidget['permanece_porcentaje']+'%'}
                                                text="Permanece en programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-success"
                                                header={dataPorcentajeYearsWidget['cambio_porcentaje']+'%'}
                                                text="Cambia de programa"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2" >
                                                <CWidgetDropdown
                                                color="gradient-warning"
                                                header={dataPorcentajeYearsWidget['graduado_porcentaje']+'%'}
                                                text="Graduado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-danger"
                                                header={dataPorcentajeYearsWidget['no_matriculado_porcentaje']+'%'}
                                                text="No Matriculado"
                                                ></CWidgetDropdown>
                                            </CCol>
                                            <CCol sm="3" lg="2">
                                                <CWidgetDropdown
                                                color="gradient-dark"
                                                header={dataYearsWidget['suma']}
                                                text="Total Estudiantes"
                                                ></CWidgetDropdown>
                                            </CCol>
                                        </CRow>
                                        <CChartPie
                                            datasets={[
                                            {
                                                backgroundColor: [
                                                '#321fbd',
                                                '#39f',
                                                '#f9b115',
                                                '#e55353',
                                                ],
                                                data: [
                                                    dataYearsWidget['Permanece programa'],
                                                    dataYearsWidget['Cambio de programa'],
                                                    dataYearsWidget['Graduado'],
                                                    dataYearsWidget['No matriculado'],
                                                ]
                                            }
                                            ]}
                                            labels={['Permanece programa','Cambio de programa','Graduado','No matriculado']}
                                            options={{
                                            tooltips: {
                                                enabled: true
                                            }
                                            }}
                                        />                         
                                    </div>
                                    
                                }        
                            </CCardBody>
                        </CCollapse>                
            </CCollapse>
            <CCollapse show={collapseProgramas}>
                    <CCardBody>
                        <h1 style={{marginTop:'1%',textAlign: 'center'}}>
                            Desercion Interanual por Programa Académico
                        </h1> 
                        <CCardBody>
                            <p className="text-muted" style={{textAlign: 'center',fontWeight:'bold'}}>
                                Elegir nivel de formación:
                            </p>
                            <CRow className="align-items-center">
                                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                    <CButton block variant="outline" color="info" 
                                        onClick={toggleProgramasPregrado}
                                        > Pregrado
                                    </CButton>
                                </CCol>
                                <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                    <CButton block variant="outline" color="info" 
                                        onClick={toggleProgramasPosgrado }
                                        >Posgrado
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCardBody>
                <CCollapse show={collapseProgramasPregrado}>
                    <CDataTable
                        items={tablaProgramasPregrado}
                        fields={fieldsTablaProgramas}
                        itemsPerPage={5}
                        pagination
                        columnFilter
                        align='middle'
                        color='primary'
                        borderColor="dark"
                        bordered={true}
                    />  
                </CCollapse>
                <CCollapse show={collapseProgramasPosgrado}>
                    <CDataTable
                        items={tablaProgramasPosgrado}
                        fields={fieldsTablaProgramas}
                        itemsPerPage={5}
                        pagination
                        columnFilter
                        align='middle'
                        color='primary'
                        borderColor="dark"
                        bordered={true}
                    />

                </CCollapse>
            </CCollapse>
        </CCard>
        
            
                
        </> 
    )    
}

export default DesercionInteranual