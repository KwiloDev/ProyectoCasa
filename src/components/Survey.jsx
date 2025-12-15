import React, { useState } from 'react'
import Step0Initial from './steps/Step0Initial'
import Step1Welcome from './steps/Step1Welcome'
import Step2Document from './steps/Step2Document'
import Step3Hello from './steps/Step3Hello'
import Step4HasHome from './steps/Step4HasHome'
import Step5Benefits from './steps/Step5Benefits'
import Step6Subsidy from './steps/Step6Subsidy'
import Step7Types from './steps/Step7Types'
import Step8Budget from './steps/Step8Budget'
import Step81Budget2 from './steps/Step81Budget2'
import Step9Finance from './steps/Step9Finance'
import Step10Extras from './steps/Step10Extras'
import Step11Final from './steps/Step11Final'


const stepsOrder = [
  'logos','welcome','doc','hello','hasHome','benefits_or_next','subsidy','types','budget','budget2','finance','extras','final'
]

export default function Survey(){
  const [index, setIndex] = useState(0)
  const [data, setData] = useState({
    document: '',
    name: 'SANTIAGO', // por ahora simulado; luego lo obtendrás desde backend
    hasHome: null, // 'si' | 'no' | 'parcialmente'
    // respuestas de pantallas adicionales
    modalMessage: "",   // aquí guardaremos lo escrito por el usuario
    incomesUnder4SM: null,
    householdNucleus: null,
    allBeneficiariesAffiliated: null,
    memberOwnsHome: null,
    hadSubsidyBefore: null,
    affiliatedToCaja: null,
    typeOfHousing: null,
    budgetChoice: null
  })
  const [modal, setModal] = useState({open:false, content:''})

  const goTo = (id) => {
    const idx = stepsOrder.indexOf(id)
    if(idx>=0) setIndex(idx)
  }
  const next = () => setIndex(i => Math.min(i+1, stepsOrder.length-1))
  const prev = () => setIndex(i => Math.max(i-1, 0))

  const update = (patch) => setData(d => ({...d,...patch}))

  // lógica de flujo: después de P4 (hasHome)
  /* DESHABILITADO TEMPORALMENTE 

  {index === 7 && <Step7Types data={data} update={update} next={() => goTo('budget')} prev={() => goTo('subsidy')} />} REEMPLAZAR EN EL PASO 7 DENTRO DEL RETURN
  const handleAfterHasHome = ({ hasHome, homeGoal }) => {

  update({
    hasHome,
    homeGoal
  });

  if (hasHome === 'si') {
    goTo('benefits_or_next');
  } else {
    goTo('subsidy');
  }
};
*/

// lógica de flujo TEMPORAL
const handleAfterHasHome = ({ hasHome, homeGoal }) => {

  update({
    hasHome,
    homeGoal
  });

  // 🔥 SALTO TEMPORAL DIRECTO AL PASO 7 (types)
  goTo('types');
};


  const percent = Math.round((index)/(stepsOrder.length-1)*100)

  return (
    <div>
      <div className="min-h-[320px]">
        {index === 0 && <Step0Initial next={next} />}
        {index === 1 && <Step1Welcome next={next} />}
        {index === 2 && (
          <Step2Document
            data={data}
            update={update}
            next={() => goTo("hello")}
          />
        )}
        {index === 3 && <Step3Hello data={data} next={() => goTo("hasHome")} />}
        {index === 4 && (
          <Step4HasHome
            onChoose={handleAfterHasHome}
            prev={() => goTo("doc")}
            userDocument={data.document} // ⬅️ PASA AQUÍ EL DOCUMENTO
          />
        )}

        {index === 5 && data.hasHome === "si" && (
          <Step5Benefits
            next={() => goTo("final")}
            prev={() => goTo("hasHome")}
          />
        )}
        {index === 6 && (
          <Step6Subsidy
            data={data}
            update={update}
            next={() => goTo("types")}
            openModal={(content) => setModal({ open: true, content })}
            prev={() => goTo("hasHome")}
          />
        )}

        {index === 7 && ( //REEMPLAZAR EN LA APP COMPLETA, TEMPORALMENTE OMITIDA : {index === 7 && <Step7Types data={data} update={update} next={() => goTo('budget')} prev={() => goTo('subsidy')} />}
          <Step7Types
            data={data}
            update={update}
            next={() => goTo("final")}
            prev={() => goTo("hasHome")}
          />
        )}
        {index === 8 && (
          <Step8Budget
            data={data}
            update={update}
            next={() => goTo("finance")}
            nextbudget2={() => goTo("budget2")}
            prev={() => goTo("types")}
          />
        )}
        {index === 9 && (
          <Step81Budget2
            data={data}
            update={update}
            next={() => goTo("extras")}
            prev={() => goTo("budget")}
          />
        )}
        {index === 10 && (
          <Step9Finance
            data={data}
            update={update}
            next={() => goTo("extras")}
            prev={() => goTo("budget")}
          />
        )}
        {index === 11 && (
          <Step10Extras
            data={data}
            update={update}
            next={() => goTo("final")}
            prev={() => goTo("finance")} //REEMPLAZAR EN LA APP COMPLETAprev={() => goTo("finance")}
          />
        )}
        {index === 12 && (
          <Step11Final
            data={data}
            prev={() => {
              // si venimos de rama propietario, volver a benefits, si no, a extras
              if (data.hasHome === "si")
                goTo(
                  "types"
                ); //Condicion anterior app completa:if (data.hasHome === "si") goTo("benefits_or_next"); else goTo("extras");
              else goTo("types");
            }}
          />
        )}
      </div>

      {/* modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setModal({ open: false, content: "" })}
          ></div>
          <div className="relative bg-white rounded-lg p-6 max-w-xl w-full shadow-lg">
            <h3 className="text-lg font-semibold" style={{ color: "#503629" }}>
              Atención
            </h3>
            <div className="mt-3">{modal.content}</div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setModal({ open: false, content: "" })}
                className="btn-primary"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}