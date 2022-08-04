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

