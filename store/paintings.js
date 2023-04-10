export const state = () => ({
  items: [
    {
      name: '----',
      description: '',
      image: '/arts/24.jpeg'
    },
    {
      name: 'Papaveri',
      description: '',
      image: '/arts/25.jpeg'
    },
    {
      name: 'Volti',
      description: '',
      image: '/arts/26.jpeg'
    },
    {
      name: 'Antico fregio',
      description: 'Copia in grafite su cartoncino di una sezione di un antico fregio, cm 23×11',
      image: '/arts/1.png'
    },
    {
      name: 'Bagnanti sulla spiaggia',
      description: 'Bagnanti sulla spiaggia cm 33×48 Copia in grafite su cartoncino dell\'originale di De Chirico',
      image: '/arts/2.png'
    },
    {
      name: '----',
      description: 'Grafite su cartoncino cm 35×21',
      image: '/arts/3.png'
    },
    {
      name: 'Gufo campana',
      description: 'Campana a forma di gufo in terracotta',
      image: '/arts/4.png'
    },
    {
      name: 'Tramonto',
      description: 'Acrilico su tela, cm 50×70',
      image: '/arts/5.png'
    },
    {
      name: 'Audrey Hepburn',
      description: 'Ritratto di Audrey Hepburn, Acrilico su tela cm 50×70',
      image: '/arts/6.png'
    },
    {
      name: '----',
      description: 'China su cartoncino, cm 33×48',
      image: '/arts/7.png'
    },
    {
      name: 'Natura morta con frutta',
      description: 'China su cartoncino, cm 33×48',
      image: '/arts/8.png'
    },
    {
      name: 'Natura morta con cipolle',
      description: 'Copia di natura morta con cipolle da originale di Paul Cézanne\n' +
        'Pastello su cartoncino, cm 33×48',
      image: '/arts/9.png'
    },
    {
      name: 'Natura morta con brocca',
      description: 'Copia di Natura morta con brocca e mele da originale di Pablo Picasso\n' +
        'Grafite su cartoncino, cm 35×50',
      image: '/arts/10.png'
    },
    {
      name: 'San Sebastiano',
      description: 'Acrilico su cartoncino, cm 21×30',
      image: '/arts/11.png'
    },
    {
      name: 'Crux infernalis',
      description: 'Croce infernale Pittura astratta su lastra di metallo, cm 45x30',
      image: '/arts/12.png'
    },
    {
      name: '----',
      description: 'Pittura astratta, tempera su tela cm 40x40',
      image: '/arts/13.png'
    },
    {
      name: 'Pioggia di meteore',
      description: 'Pittura astratta, tempera su tela cm 24x30',
      image: '/arts/14.png'
    },
    {
      name: '----',
      description: 'Pittura astratta, tempera su tela cm 40x60',
      image: '/arts/15.png'
    },
    {
      name: 'Incendio',
      description: 'Pittura astratta, tempera su tela cm 18x24',
      image: '/arts/16.png'
    },
    {
      name: 'Velieri in viaggio',
      description: 'Tempera su tavola in legno cm 40x60',
      image: '/arts/17.png'
    },
    {
      name: '----',
      description: 'Pittura astratta, tela cm 50x70',
      image: '/arts/18.jpg'
    },
    {
      name: 'Senza limiti',
      description: 'Pittura astratta, Raffigura che non ci sono limiti alla mente umana, ne muri intorno allo spirito, nessuna barriera al nostro progresso, eccetto quelli che noi stessi erigiamo, essi raffigurati come fiamme ardenti che si innalzano lasciando la loro traccia indelebile.',
      image: '/arts/19.jpg'
    },
    {
      name: 'Velieri al tramonto',
      description: 'Tela 30x25',
      image: '/arts/20.jpg'
    },
    {
      name: 'Tragedie umane',
      description: 'Pittura astratta\n' +
        'Raffigura la rabbia, l\'impotenza, l\'amarezza davanti alle tragedie della guerra quando svanisce la ragione e vi è solo la follia',
      image: '/arts/21.jpg'
    },
    {
      name: 'Il coraggio di guardare',
      description: 'Tempera su tela cm 30x40',
      image: '/arts/22.jpg'
    },
    {
      name: 'Fiordi ghiacciati all\'alba',
      description: 'Fiordi ghiacciati all\'alba, tela cm 40x50',
      image: '/arts/23.jpg'
    }
  ]
})

export const getters = {
  getItems (state) {
    return state.items
  }
}
