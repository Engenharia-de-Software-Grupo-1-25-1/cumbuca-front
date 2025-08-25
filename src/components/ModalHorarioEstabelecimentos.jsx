import { FaRegClock } from "react-icons/fa";

const ModalHorarioEstabelecimentos = ( {horarios} ) => {
    const { domingo, segunda, terca, quarta, quinta, sexta, sabado } = horarios || {};

    if (!horarios || Object.keys(horarios).length === 0) {
        return (
            <div className="p-4 text-center text-gray-800 bg-[#f7d799] rounded-lg shadow-xl max-w-lg">
                <p className="text-lg">Horários não disponíveis!</p>
            </div>
        )
    } else {
        return (
                <div className="bg-[#f7d799] p-4 rounded-lg shadow-xl max-w-lg">
                    <div className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-4 text-gray-800 items-center"> 
                        <div className="flex items-center text-lg font-semibold"> 
                            <FaRegClock size={20} className="text-black mr-2"/>
                            <span>Domingo</span>
                        </div>
                            <span className="text-lg text-right">{domingo}</span>

                            <span className="font-semibold ml-7 text-lg">Segunda-feira</span>
                            <span className="text-lg text-right">{segunda}</span>

                            <span className="font-semibold ml-7 text-lg">Terça-feira</span>
                            <span className="text-lg text-right">{terca}</span>
                            
                            <span className="font-semibold ml-7 text-lg">Quarta-feira</span>
                            <span className="text-lg text-right">{quarta}</span>

                            <span className="font-semibold ml-7 text-lg">Quinta-feira</span>
                            <span className="text-lg text-right">{quinta}</span>
                            
                            <span className="font-semibold ml-7 text-lg">Sexta-feira</span>
                            <span className="text-lg text-right">{sexta}</span>

                            <span className="font-semibold ml-7 text-lg">Sábado</span>
                            <span className="text-lg text-right">{sabado}</span>
                    </div>
                </div> 
        );   
    }
}

export default ModalHorarioEstabelecimentos;