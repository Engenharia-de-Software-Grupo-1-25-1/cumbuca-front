export default function categorias(type) {
  if (!type) return '';
  const map = {
    cafe: 'Café',
    restaurant: 'Restaurante',
    bar: 'Bar',
    pub: 'Pub',
    fast_food: 'Fast food',
    food_court: 'Praça de alimentação',
    ice_cream: 'Sorveteria',
    bakery: 'Padaria',
    cinema: 'Cinema',
    fuel: 'Posto de combustível',
    restaurant_bar: 'Restaurante/Bar',
    commercial: 'Comercial',
    administrative: 'Comercial',
    supermarket: 'Supermercado',
    convenience: 'Loja de conveniência',
    bakery_shop: 'Padaria',
    butcher: 'Açougue',
    greengrocer: 'Hortifruti',
    confectionery: 'Confeitaria',
    mall: 'Shopping',
    kiosk: 'Banca/Quiosque',
    pastry: 'Confeitaria',
    tea: 'Chá',
    coffee: 'Cafeteria',
    hotel: 'Hotel',
    motel: 'Motel',
    guest_house: 'Pousada',
    hostel: 'Hostel',
    apartment: 'Apartamento',
    chalet: 'Chalé',
    resort: 'Resort',
    camp_site: 'Camping',
    caravan_site: 'Área de trailers',
    viewpoint: 'Mirante',
    theme_park: 'Parque temático',
    zoo: 'Zoológico',
    aquarium: 'Aquário',
    park: 'Parque',
    garden: 'Jardim',
    playground: 'Parquinho',
    swimming_pool: 'Piscina',
    stadium: 'Estádio',
    golf_course: 'Campo de golfe',
    dog_park: 'Parque para cães',
    bus_station: 'Rodoviária',
    airport: 'Aeroporto',
    aerodrome: 'Aeródromo',
    bed_and_breakfast: 'Cama e Café (B&B)',
    guesthouse: 'Pousada',
    bbq: 'Churrasco',
    brewery: 'Cervejaria',
    winery: 'Vinícola',
    steak_house: 'Steakhouse',
    sushi: 'Sushi',
    noodle: 'Massa/Lamen',
    pizza: 'Pizzaria',
    burger: 'Hamburgueria',
    sandwich: 'Sanduíches',
    crepe: 'Creperia',
    pancake: 'Panquecas',
  };

  if (map[type]) return map[type];

  const pretty = type
    .split('_')
    .map(w => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');

  return pretty;
}
