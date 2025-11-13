import React from 'react'
import './Step8Budget.css'


export default function Step8Budget({ data, update, next, prev }){
  const choose = (val) => { update({ budgetChoice: val }); next() }

  return (
    <div className="space-y-4 step8-budget">

      <h3 className="text-lg font-semibold" style={{color:'#503629'}}>Ahora que ya sabes el tipo de vivienda, veamos tu presupuesto</h3>
      <div className="mt-3 grid sm:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h4 className="font-semibold">Tengo el dinero completo</h4>
          <p className="text-sm mt-1">Puedo comprar sin crédito.</p>
          <button onClick={()=>choose('completo')} className="mt-3 btn-primary">Seleccionar</button>
        </div>
        <div className="p-3 border rounded">
          <h4 className="font-semibold">No tengo claro mi presupuesto</h4>
          <p className="text-sm mt-1">Necesito estimar gastos y cuotas.</p>
          <button onClick={()=>choose('estimar')} className="mt-3 btn-primary">Obtener estimado</button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="btn-ghost">Volver</button>
      </div>
    </div>
  )
}
