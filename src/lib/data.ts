import type { Story } from '@/lib/types';

export const sampleStories: Story[] = [
  {
    story_id: '1',
    title: 'La Receta Secreta de la Abuela',
    audio_url: '/placeholder-audio.mp3',
    photo_url: 'https://picsum.photos/600/400',
    text_transcript:
      'Mi abuela solía decir que el secreto de sus empanadas no estaba en los ingredientes, sino en el amor con que las hacía. Cada domingo, la casa se llenaba de un aroma a comino y a felicidad. Nos juntábamos todos en la cocina, y ella nos contaba historias de su infancia en el campo mientras amasaba. Decía que cada pliegue de la empanada guardaba un deseo.',
    family_member_name: 'Abuela María',
    emotional_tag: ['Nostalgia', 'Amor', 'Familia'],
    nfc_card_id: 'nfc-001',
    timestamp: new Date('2023-04-12T14:30:00Z'),
  },
  {
    story_id: '2',
    title: 'El Primer Sueldo de Papá',
    audio_url: '/placeholder-audio.mp3',
    photo_url: 'https://picsum.photos/600/401',
    text_transcript:
      'Papá siempre cuenta con orgullo la historia de su primer sueldo. Trabajaba en un taller mecánico y después de un mes de esfuerzo, cobró su paga. En lugar de gastarlo en algo para él, compró una radio para la casa. Esa noche, la familia entera se reunió a escuchar un partido de fútbol. Fue la primera vez que sintió que podía cuidar de nosotros.',
    family_member_name: 'Papá Jorge',
    emotional_tag: ['Orgullo', 'Sacrificio'],
    nfc_card_id: 'nfc-002',
    timestamp: new Date('2023-05-20T18:00:00Z'),
  },
  {
    story_id: '3',
    title: 'Viaje Inolvidable a la Costa',
    audio_url: '/placeholder-audio.mp3',
    photo_url: 'https://picsum.photos/600/402',
    text_transcript:
      'Un verano, nos subimos todos al auto viejo de la familia y manejamos hasta la costa. El viaje fue una aventura, con el motor sobrecalentándose y los niños cantando sin parar. Pero al ver el mar por primera vez, todo valió la pena. Construimos castillos de arena y corrimos por la orilla hasta que el sol se escondió. Fue la definición de libertad.',
    family_member_name: 'Familia Rodriguez',
    emotional_tag: ['Aventura', 'Alegría', 'Libertad'],
    nfc_card_id: 'nfc-003',
    timestamp: new Date('2023-08-01T11:00:00Z'),
  },
  {
    story_id: '4',
    title: 'Historia de Nuestro Apellido',
    audio_url: '/placeholder-audio.mp3',
    photo_url: 'https://picsum.photos/600/403',
    text_transcript:
      'El abuelo nos contó que nuestro apellido, "Pereira", viene de los inmigrantes portugueses que llegaron a Uruguay buscando una nueva vida. Trajeron con ellos poco más que sus esperanzas y un amor profundo por la tierra. Cada vez que escucho nuestro apellido, pienso en su valentía y en las raíces que plantaron aquí, en Artigas.',
    family_member_name: 'Abuelo Juan',
    emotional_tag: ['Herencia', 'Valentía'],
    nfc_card_id: 'nfc-004',
    timestamp: new Date('2023-10-25T20:15:00Z'),
  },
  {
    story_id: '5',
    title: 'La Canción de Cuna de Mamá',
    audio_url: '/placeholder-audio.mp3',
    photo_url: 'https://picsum.photos/600/404',
    text_transcript:
      'Cuando no podía dormir, mamá se sentaba al borde de mi cama y me cantaba una canción de cuna muy suave. No recuerdo toda la letra, pero sí su voz, que era como un abrazo cálido. Me hacía sentir seguro y protegido. Ahora, a veces la tarareo para mis propios hijos, esperando darles la misma paz que ella me dio a mí.',
    family_member_name: 'Mamá Lucía',
    emotional_tag: ['Amor', 'Paz', 'Seguridad'],
    nfc_card_id: 'nfc-005',
    timestamp: new Date('2024-01-15T22:00:00Z'),
  },
];
