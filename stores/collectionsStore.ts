import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCollectionsStore = defineStore('collections', () => {
    const collections = ref([
            {
                uuid: 'e48e28f5-1b2c-4c8e-b121-3d97adf571a5',
                name: '----',
                description: '',
                image: '/arts/24.webp'
            },
            {
                uuid: 'aa31d5b0-358c-4417-b5c4-1088a71a16ea',
                name: 'Papaveri',
                description: '',
                image: '/arts/25.webp'
            },
            {
                uuid: 'd924c002-bf4d-4c27-8fa5-c9cfe4e3dc97',
                name: 'Volti',
                description: '',
                image: '/arts/26.webp'
            },
            {
                uuid: 'ab2ef9de-d0e5-4037-9373-4bfc204a60a5',
                name: 'Antico fregio',
                description: 'Copia in grafite su cartoncino di una sezione di un antico fregio, cm 23×11',
                image: '/arts/1.webp'
            },
            {
                uuid: 'c72d7c5e-fd4d-48f8-b908-c6ff708c8dfb',
                name: 'Bagnanti sulla spiaggia',
                description: 'Bagnanti sulla spiaggia cm 33×48 Copia in grafite su cartoncino dell\'originale di De Chirico',
                image: '/arts/2.webp'
            },
            {
                uuid: 'bd02efeb-cac6-4e98-a485-e23db78c7fd4',
                name: '----',
                description: 'Grafite su cartoncino cm 35×21',
                image: '/arts/3.webp'
            },
            {
                uuid: 'a75be2de-0e50-4e8a-899b-3dbedbdc152e',
                name: 'Gufo campana',
                description: 'Campana a forma di gufo in terracotta',
                image: '/arts/4.webp'
            },
            {
                uuid: '2ed5b13a-84d3-4e6b-b482-d859761eb3a8',
                name: 'Tramonto',
                description: 'Acrilico su tela, cm 50×70',
                image: '/arts/5.webp'
            },
            {
                uuid: '14e0ddee-579e-41f5-8f99-8232e14b574b',
                name: 'Audrey Hepburn',
                description: 'Ritratto di Audrey Hepburn, Acrilico su tela cm 50×70',
                image: '/arts/6.webp'
            },
            {
                uuid: '2ab3b740-e9f5-469b-9f30-1e2f98d6cb8e',
                name: '----',
                description: 'China su cartoncino, cm 33×48',
                image: '/arts/7.webp'
            },
            {
                uuid: '5ef1b8f1-c7ae-4697-8c7d-68c55b36bbad',
                name: 'Natura morta con frutta',
                description: 'China su cartoncino, cm 33×48',
                image: '/arts/8.webp'
            },
            {
                uuid: '6ed7a4e7-2643-4fa3-b8f3-524f3fa5b1cc',
                name: 'Natura morta con cipolle',
                description: 'Copia di natura morta con cipolle da originale di Paul Cézanne\nPastello su cartoncino, cm 33×48',
                image: '/arts/9.webp'
            },
            {
                uuid: '05d25715-1e5c-4233-990d-0cf5c7f5c3fc',
                name: 'Natura morta con brocca',
                description: 'Copia di Natura morta con brocca e mele da originale di Pablo Picasso\nGrafite su cartoncino, cm 35×50',
                image: '/arts/10.webp'
            },
            {
                uuid: 'ec70b02b-71e8-4892-9a69-2207312db030',
                name: 'San Sebastiano',
                description: 'Acrilico su cartoncino, cm 21×30',
                image: '/arts/11.webp'
            },
            {
                uuid: 'b6b1508e-4b2a-4f83-b948-d6228f66293e',
                name: 'Crux infernalis',
                description: 'Croce infernale Pittura astratta su lastra di metallo, cm 45x30',
                image: '/arts/12.webp'
            },
            {
                uuid: 'd97ef25d-b5f0-4d77-9a2b-04723b5f3768',
                name: '----',
                description: 'Pittura astratta, tempera su tela cm 40x40',
                image: '/arts/13.webp'
            },
            {
                uuid: '30f31e3f-cd94-4e9f-bd18-d3a60fc1c8af',
                name: 'Pioggia di meteore',
                description: 'Pittura astratta, tempera su tela cm 24x30',
                image: '/arts/14.webp'
            },
            {
                uuid: '48fae173-5730-4f1c-9cd1-78cf73f4287b',
                name: '----',
                description: 'Pittura astratta, tempera su tela cm 40x60',
                image: '/arts/15.webp'
            },
            {
                uuid: 'b5680747-d2b5-4cf0-b7f3-2362c57f9a96',
                name: 'Incendio',
                description: 'Pittura astratta, tempera su tela cm 18x24',
                image: '/arts/16.webp'
            },
            {
                uuid: 'd194af04-3e70-4e31-8c37-7f3bb0379ad6',
                name: 'Velieri in viaggio',
                description: 'Tempera su tavola in legno cm 40x60',
                image: '/arts/17.webp'
            },
            {
                uuid: 'c10a3458-0ed8-4011-8ac6-59589e3d8e32',
                name: '----',
                description: 'Pittura astratta, tela cm 50x70',
                image: '/arts/18.webp'
            },
            {
                uuid: 'af3375e7-4e71-40c2-8a6a-cf9458ab3b11',
                name: 'Senza limiti',
                description: 'Pittura astratta, Raffigura che non ci sono limiti alla mente umana...',
                image: '/arts/19.webp'
            },
            {
                uuid: 'e2aaf5b2-32e5-41a4-9b3f-c0fe861eb9ff',
                name: 'Velieri al tramonto',
                description: 'Tela 30x25',
                image: '/arts/20.webp'
            },
            {
                uuid: '92d97be6-bbee-4a32-8ae1-5484e1443a4e',
                name: 'Tragedie umane',
                description: 'Pittura astratta\nRaffigura la rabbia, l\'impotenza, l\'amarezza davanti alle tragedie della guerra...',
                image: '/arts/21.webp'
            },
            {
                uuid: 'bc2d6c6d-daba-4a85-b78c-94f8a08d21a8',
                name: 'Il coraggio di guardare',
                description: 'Tempera su tela cm 30x40',
                image: '/arts/22.webp'
            },
            {
                uuid: '7c213ebd-b71c-4f6b-8658-6d53c8d8e0ae',
                name: 'Fiordi ghiacciati all\'alba',
                description: 'Fiordi ghiacciati all\'alba, tela cm 40x50',
                image: '/arts/23.webp'
            }
        ]
    )

    const getAll = async () => {
        return collections.value
    }

    const getOne = async (id: string) => {
        return collections.value.find((collection) => collection.name === id)
    }

    return {
        collections,
        getAll,
        getOne,
    }
})
