import React from 'react'

export default function useModelProperty(model, propertyName){  // custom hook
    const [value, setValue]=React.useState(model[propertyName]);
    React.useEffect( function(){  
              function obs(){
                setValue(model[propertyName]);
              }
              model.addObserver(obs);                               
              return function(){ model.removeObserver(obs); }        
           }, [model]) ;  // though model never changes 
    return value;
}