import React, { useEffect, useRef } from 'react';
import Litepicker from 'litepicker';
import "./externalComponents.css"


export const RangeCalendar = ({typeFilter,onSelect,value}) => {
 

   const inputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    // Inyectamos la instancia en pickerRef.current
    pickerRef.current = new Litepicker({
      element: inputRef.current,
      singleMode: false,
      maxDays: 30,
      selectForward: true,
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {

          const fullDates = {
              dateOne: `${date1.format('YYYY-MM-DD')}T00:00:00`,
              dateSecond: `${date2.format('YYYY-MM-DD')}T00:00:00`
          }

          onSelect({
            filter: typeFilter,
            value: fullDates 
          });

        });
      },
    });

    return () => pickerRef.current?.destroy();
  }, [onSelect]);

  // Sincronización: Si el padre manda un valor vacío, limpiamos el calendario visual
  // useEffect(() => {
  //   if (value=="") {
  //     pickerRef.current.clearSelection();
  //   }
  // }, [value]);

  return <input 
        ref={inputRef} 
        value={value?.dateOne ? `${value.dateOne.split('T')[0]} - ${value.dateSecond.split('T')[0]}` : ''} 
        className="calendar-input" 
        readOnly
      />;
};