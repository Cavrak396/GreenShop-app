import flowerpotThird from "../../../assets/images/banner/banner-image.png";

export interface FakeDataTypes {
  id: number;
  price: number;
  label: string;
  src: string;
  sale: number | undefined;
  description: string;
  alt?: string;
}

const fakeData: FakeDataTypes[] = [
  {
    id: 1,
    price: 169,
    label: "Barberton Daisy",
    src: flowerpotThird,
    sale: 13,
    description:
      "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground, adding both elegance and functionality to your space. The bright, vibrant colors of the Barberton Daisy are sure to bring a burst of life and freshness to any room. Known for its striking, multi-colored flowers, the Barberton Daisy can bloom year-round, filling your home with joy and beauty. The flowers attract bees and butterflies, which further enhance your indoor ecosystem. This easy-to-care-for plant requires minimal watering and thrives in bright, indirect sunlight. It’s ideal for living rooms, offices, or as a centerpiece in your home. Additionally, it is a non-toxic plant, making it safe around pets and children, providing peace of mind while adding a touch of nature to your surroundings.",
  },
  {
    id: 2,
    price: 199.0,
    label: "Peace Lily",
    src: flowerpotThird,
    sale: undefined,
    description:
      "The Peace Lily is a popular indoor plant known for its beautiful white blooms and air-purifying qualities. This plant thrives in low to medium light conditions and is particularly effective at removing harmful toxins from the air, such as benzene, formaldehyde, and trichloroethylene. The elegant white flowers bloom throughout the year, especially during the warmer months, making it a timeless addition to any indoor environment. Not only does it purify the air, but it also helps maintain a balanced humidity level, making it beneficial for both your health and the atmosphere in your home or office. The Peace Lily requires minimal care, needing only regular watering and occasional misting. Its graceful presence makes it a perfect gift for housewarmings, birthdays, or anyone who enjoys easy-to-maintain plants.",
  },
  {
    id: 3,
    price: 249.0,
    label: "Snake Plant",
    src: flowerpotThird,
    sale: 45,
    description:
      "The Snake Plant, also known as mother-in-law's tongue, is a resilient plant with striking sword-shaped leaves that are vibrant green with yellow edges. This plant is known for its incredible adaptability, thriving in a variety of light conditions, from low light to direct sunlight, making it a perfect plant for almost any environment. The Snake Plant is particularly valued for its air-purifying properties, effectively filtering out toxins like formaldehyde, benzene, and xylene. Its sturdy leaves can withstand long periods without water, making it a fantastic option for those who travel frequently or forget to water their plants. Additionally, the Snake Plant helps regulate the humidity levels in your home, promoting better overall air quality. It’s an excellent choice for both beginners and experienced plant owners, requiring minimal maintenance while providing maximum aesthetic impact.",
  },
  {
    id: 4,
    price: 139.0,
    label: "Spider Plant",
    src: flowerpotThird,
    sale: 70,
    description:
      "The Spider Plant is a hardy, easy-to-care-for houseplant that produces charming little 'spiderettes' that dangle from the parent plant. Known for its ability to thrive in almost any condition, the Spider Plant is an ideal choice for beginners and busy individuals. It can tolerate a range of lighting, including low light, making it perfect for offices, kitchens, or bedrooms. As a natural air purifier, the Spider Plant helps filter harmful chemicals like formaldehyde and xylene, promoting a healthier indoor environment. This plant’s fast-growing nature means it can quickly fill a space with its green foliage, adding a fresh, vibrant touch to any room. Whether placed in a hanging basket or on a shelf, the Spider Plant’s long, arching leaves make it visually appealing. Its non-toxic nature also makes it safe for homes with pets and children, further adding to its appeal.",
  },
  {
    id: 5,
    price: 159.0,
    label: "Aloe Vera",
    src: flowerpotThird,
    sale: undefined,
    description:
      "The Aloe Vera plant is widely known for its soothing, medicinal properties, particularly for treating burns, cuts, and skin irritation. This succulent plant stores water in its thick, fleshy leaves, which makes it an ideal choice for those new to plant care or anyone with a busy lifestyle. Aloe Vera thrives in bright, indirect sunlight and requires very little watering, as it is highly drought-tolerant. Apart from its healing qualities, Aloe Vera also purifies the air, removing toxins like formaldehyde and benzene. Aloe Vera is a versatile plant that can be used in skincare routines, and the gel from its leaves can be applied directly to the skin for its cooling effects. This plant can grow indoors or in gardens, and it’s a must-have for anyone looking to improve both their health and home decor. Additionally, Aloe Vera is non-toxic, making it safe to keep around pets.",
  },
  {
    id: 6,
    price: 199.0,
    label: "Rubber Plant",
    src: flowerpotThird,
    sale: 88,
    description:
      "The Rubber Plant is a tropical tree known for its large, glossy leaves that come in various shades of green. Its bold, upright growth makes it a statement plant that works well in modern and minimalist decor. Rubber Plants thrive in bright, indirect light but can tolerate some lower light conditions, making them adaptable to different environments. In addition to being visually striking, the Rubber Plant is an excellent air purifier, filtering out toxins such as formaldehyde and benzene from your home. It’s a low-maintenance plant, requiring only occasional watering, as it prefers to dry out between waterings. This makes it an ideal option for plant lovers who may not have time for regular plant care. With proper attention, it can grow quite large, becoming a stunning focal point in any room. The Rubber Plant’s non-toxic nature also ensures it’s safe to keep in homes with pets.",
  },
  {
    id: 7,
    price: 89.0,
    label: "Cactus",
    src: flowerpotThird,
    sale: undefined,
    description:
      "Cacti are low-maintenance plants perfect for adding a desert-inspired touch to your home decor. These hardy plants require minimal attention, as they thrive in dry conditions and can go weeks without water. Cacti come in various shapes, sizes, and colors, from the tall, spiny varieties to smaller, rounder forms, making them a versatile option for any space. They are especially suited for sunny locations, such as windowsills or bright corners, as they need plenty of sunlight to flourish. Cacti are known for their resilience and can survive in a variety of environments, making them ideal for busy people or beginners. They also help to purify the air, improving the overall air quality in your home. With their striking appearance and minimal care requirements, cacti are an excellent choice for anyone looking for a low-maintenance, unique plant.",
  },
  {
    id: 8,
    price: 120.0,
    label: "Pothos",
    src: flowerpotThird,
    sale: 55,
    description:
      "The Pothos plant is one of the most popular indoor plants due to its ease of care and beautiful, trailing vines. Pothos is incredibly versatile, thriving in a wide range of lighting conditions, from low light to bright, indirect sunlight. Its heart-shaped leaves come in various shades of green, yellow, and white, adding an elegant touch to any room. As a low-maintenance plant, Pothos only requires watering when the soil is dry, making it ideal for people with busy schedules. In addition to being a beautiful decorative piece, Pothos also helps to purify the air, making it an excellent choice for homes and offices. Whether placed in a hanging basket or allowed to trail from a shelf or pot, this plant is perfect for adding greenery to hard-to-reach areas. Pothos is also non-toxic, making it safe around pets and children.",
  },
  {
    id: 9,
    price: 110.0,
    label: "Bamboo Plant",
    src: flowerpotThird,
    sale: 20,
    description:
      "The Bamboo Plant is often considered a symbol of luck, prosperity, and good fortune. It is commonly used in Feng Shui practices to bring positive energy into a space. Bamboo is incredibly easy to care for, requiring little maintenance beyond occasional watering and a spot with indirect light. It is often grown in water, which allows for low maintenance and adds a unique visual element to your decor. In addition to being a beautiful and meaningful plant, Bamboo helps purify the air by removing toxins like formaldehyde and benzene. This makes it an excellent choice for home or office spaces where fresh air is a priority. Its unique appearance and symbolism make it an ideal gift for anyone looking to enhance their indoor environment with a touch of nature. Bamboo is also safe for pets, making it a great option for families with animals.",
  },
];

export default fakeData;
