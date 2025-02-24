import { PiForkKnifeDuotone, PiSwimmingPoolDuotone } from "react-icons/pi";
import { TbTreadmill } from "react-icons/tb";


const aboutCards = [
    {
        id: 1,
        heading: `Restaurant`,
        icon: <PiForkKnifeDuotone className='h-12 w-auto' />,
        text: `Experience exquisite dining at Marina Hotel with our diverse culinary offerings – from seaside fine dining, where coastal flavors come to life, to our breezy terrace providing a perfect backdrop.`
    },
    {
        id: 2,
        heading: `Swimming Pool`,
        icon: <PiSwimmingPoolDuotone className='h-12 w-auto' />,
        text: `Dive into relaxation at Marina Hotel's pristine swimming pool, where sparkling waters and comfortable loungers create the perfect oasis for rejuvenation. Whether you're taking a refreshing dip or basking in the sun, our poolside offers a serene escape by the sea.`
    },
    {
        id: 3,
        heading: `Fitness Area`,
        icon: <TbTreadmill className='h-12 w-auto' />,
        text: `Elevate your well-being at Marina Hotel's state-of-the-art fitness area, equipped with modern exercise equipment. Maintain your fitness routine while enjoying panoramic views of the coast, ensuring a balanced and invigorating stay.`
    },
    {
        id: 4,
        heading: `Mini Bar`,
        icon: <TbTreadmill className='h-12 w-auto' />,
        text: `Indulge in convenience and refreshment with Marina Hotel's well-stocked mini bar in every room, offering a selection of beverages and snacks to enhance your comfort during your stay.`
    },
    {
        id: 5,
        heading: `Meeting Room`,
        icon: <TbTreadmill className='h-12 w-auto' />,
        text: `Your business gatherings at Marina Hotel's versatile meeting rooms, where modern technology meets coastal sophistication. Whether for conferences or brainstorming sessions, our dedicated spaces provide a productive and inspiring environment for successful collaborations.`
    },
    {
        id: 6,
        heading: `Laundry Service`,
        icon: <TbTreadmill className='h-12 w-auto' />,
        text: `Experience hassle-free travel with Marina Hotel's convenient laundry services, ensuring your wardrobe remains fresh and ready for every adventure. Let us take care of the details, so you can focus on enjoying your coastal escape.`
    }
]

export default aboutCards;