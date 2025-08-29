import {j} from '../utils/utilsModal.helpers';

export default function SelectCategorias({categoria, setCategoria}) {
    return (
        <div>
            <label htmlFor="categoria" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                    Categoria 
            </label>
            <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className={j('w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600','bg-[#F2D7A0]')}>
                <option value="">Todas</option>
                    <option value="butcher">Açougue</option>
                <option value="aerodrome">Aeródromo</option>
                <option value="airport">Aeroporto</option>
                <option value="apartment">Apartamento</option>
                <option value="aquarium">Aquário</option>
                <option value="caravan_site">Área de trailers</option>
                <option value="kiosk">Banca/Quiosque</option>
                <option value="bar">Bar</option>
                <option value="cafe">Café</option>
                <option value="coffee">Cafeteria</option>
                <option value="bed_and_breakfast">Cama e Café (B&B)</option>
                <option value="golf_course">Campo de golfe</option>
                <option value="camp_site">Camping</option>
                <option value="chalet">Chalé</option>
                <option value="tea">Chá</option>
                <option value="bbq">Churrasco</option>
                <option value="cinema">Cinema</option>
                <option value="administrative">Comercial</option>
                <option value="commercial">Comercial</option>
                <option value="confectionery">Confeitaria</option>
                <option value="pastry">Confeitaria</option>
                <option value="crepe">Creperia</option>
                <option value="brewery">Cervejaria</option>
                <option value="stadium">Estádio</option>
                <option value="fast_food">Fast food</option>
                <option value="hamburgueria">Hamburgueria</option>
                <option value="greengrocer">Hortifruti</option>
                <option value="hotel">Hotel</option>
                <option value="hostel">Hostel</option>
                <option value="garden">Jardim</option>
                <option value="convenience">Loja de conveniência</option>
                <option value="noodle">Massa/Lamen</option>
                <option value="viewpoint">Mirante</option>
                <option value="motel">Motel</option>
                <option value="bakery">Padaria</option>
                <option value="bakery_shop">Padaria</option>
                <option value="pancake">Panquecas</option>
                <option value="park">Parque</option>
                <option value="dog_park">Parque para cães</option>
                <option value="playground">Parquinho</option>
                <option value="theme_park">Parque temático</option>
                <option value="swimming_pool">Piscina</option>
                <option value="pizza">Pizzaria</option>
                <option value="fuel">Posto de combustível</option>
                <option value="guesthouse">Pousada</option>
                <option value="food_court">Praça de alimentação</option>
                <option value="pub">Pub</option>
                <option value="restaurant">Restaurante</option>
                <option value="restaurant_bar">Restaurante/Bar</option>
                <option value="resort">Resort</option>
                <option value="bus_station">Rodoviária</option>
                <option value="sandwich">Sanduíches</option>
                <option value="mall">Shopping</option>
                <option value="ice_cream">Sorveteria</option>
                <option value="steak_house">Steakhouse</option>
                <option value="supermarket">Supermercado</option>
                <option value="sushi">Sushi</option>
                <option value="winery">Vinícola</option>
                <option value="zoo">Zoológico</option>
            </select>
        </div>
    );
}