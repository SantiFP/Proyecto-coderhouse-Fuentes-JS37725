// En este archivo obtengo los datos mediante fetch desde un archivo json llamado stock.json

const API = '../js/stock.json';

const getGuitars = async ()=>{
    try {
        const response = await fetch(API)
        guitars = await response.json();
        return guitars
    }
    catch(error) {   
        console.log('error: ' , error);
    }
};

