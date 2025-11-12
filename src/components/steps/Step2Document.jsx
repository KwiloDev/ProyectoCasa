import React, { useState } from 'react'
import './Step2Document.css'


export default function Step2Document({ data, update, next }){
  const [doc, setDoc] = useState(data.document || '')
  const [error, setError] = useState('')

  const handle = () => {
    if(!doc || doc.length < 6){ setError('Ingresa un número de documento válido (mín 6 dígitos).'); return }
    update({ document: doc })
    setError('')
    next()
  }

  return (
    <div className="space-y-4">
      <p className="text-sm">Ingresa por favor tu número de documento:</p>
      <input className="input" value={doc} onChange={e=>setDoc(e.target.value.replace(/\s/g,''))} placeholder="Cédula / Documento" />
      {error && <div className="text-xs text-red-600">{error}</div>}
      <div className="mt-4 flex justify-end">
        <button onClick={handle} className="btn-primary">Continuar</button>
      </div>
    </div>
  )
}
