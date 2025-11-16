export interface LocationImage {
  url: string
  alt: string
}

export interface LocationData {
  id: number
  name: string
  description: string
  images: LocationImage[]
  audioUrl: string
  transcript: string
  coordinates: {
    lat: number
    lng: number
  }
}

export const locationsData: LocationData[] = [
  {
    id: 1,
    name: 'Trinidad, CO Post Office',
    description: '301 E. Main St.',
    images: [
      { url: '/images/post1.jpg', alt: 'U.S. Post Office exterior' },
      { url: '/images/post2.jpg', alt: 'Post Office architectural detail' },
      { url: '/images/post3.jpg', alt: 'Post Office front view' }
    ],
    audioUrl: '/audio/post.mp3',
    transcript: `U.S. Post Office: 301 E. Main St.

From the Baca House looking south is located one of the town's three buildings listed in the National Registry of Historic Sites, the U.S. Post Office. Built in 1910 in pure new-classic style, the building features Ionic columns topped by a Greek pediment. It is built on the site of a gargoyle of a building, a three-story pile of stone with small windows and many turrets and towers. Originally a private home, it was for several years The Trinidad Club, an exclusive, quiet, and formal men's club back when the little city offered many amenities normally found only in metropolitan areas.

Where there is now the post office parking lot was a handsome, mansard-roofed three-story home. Those two houses, plus the Chappell home on the corner (now a funeral home), and the two large homes in the museum complex, gave this block the moniker of Millionaire's Row in the late 1800s. Probably none of the families was of true millionaire status, an enormous fortune in those days, but there is no doubt they were all quite wealthy and enjoyed a gracious life here.

And it was right smack dab in the middle of this bastion of reactionary wealth that another dramatic episode took place during the 1913-14 miners' strike. The nationally famous (or infamous) Mother Jones was in town. A union organizer, a fiery public speaker, and a great morale-booster for the union, the little white-haired spitfire had been in and out of Trinidad and the surrounding coal camps several times since the strike began, inspiring the miners and becoming loved by their women. In January 1914, she arrived again, defying an order from General John Chase, commander of the Colorado Militia that was trying to maintain order. Warned she was coming, General Chase met her at the railroad station and promptly incarcerated her "for her own protection" in a guarded room at Mt. San Rafael Hospital, some 12 blocks east of here. The miners were infuriated.

From the far-flung coal camps and the tent colonies where the strikers huddled, they came to town on a cold January 22nd, 1914. More than a thousand of them gathered at Castle Hall (today's Eagle Hall about a block west of the Commercial Street bridge). The general had warned the miners not to approach the hospital or there would be violence, so it was decided only the women and children would march in protest. About 400 of them straggled in ragged lines east to Commercial, across the river and up to Main, intimidated and confused at first, but becoming increasingly bold. Shouting their hatred up at the second floor of the Columbian, they turned east on Main, headed for the hospital.

In the intersection of Main and Walnut at the end of this block, the cavalry waited in a solid phalanx. General Chase rode back and forth on his nervous horse. The women stopped and milled about, shouting, surging forward, pushed by those behind. The general's horse slipped (or jumped from a jabbing umbrella) and fell. The general lost his seat, his dignity, and his temper in one fell swoop. Whether or not he cried "Charge!" was never determined in later hearings, but charge the cavalry did, sabers drawn and bayonets bared. The women fell back, throwing rocks, curses, and screams at the mounted men. In the melee, arms were slashed, feet crushed under hooves, and one ear was severed. The women finally scattered and Mother Jones remained in the hospital until union lawyers gained her release.`,
    coordinates: { lat: 37.1697, lng: -104.5047 }
  },
  {
    id: 2,
    name: 'Trinidad Opera House',
    description: '100-116 W. Main St.',
    images: [
      { url: '/images/Opera1.JPG', alt: 'Trinidad Opera House exterior' },
      { url: '/images/Opera2.png', alt: 'Opera House architectural detail' },
      { url: '/images/Opera3.jpg', alt: 'Opera House stonework' }
    ],
    audioUrl: '/audio/Opera.mp3',
    transcript: `Trinidad Opera House: 100-116 W. Main St.

Across the street to the south is the second oldest building on the intersection, the Trinidad Opera House built in 1883 by the Jaffa brothers, early Jewish merchants. It is an often overlooked fact that many of the early settlers of the Old West and the builders of our towns – right alongside Hollywood's gruff ranchers, brave school ma'arms, strong but fair saloon keepers, and prostitutes with hearts of gold – were real life Jewish merchants. The first of the Jaffa brothers, Sol, came to Trinidad in 1871 when he was 22, the town was about 10 years old, and the population was about 500. He was soon joined by his brothers Henry and Sam, and they opened the Jaffa Bros. General merchandise store. They apparently prospered, for 12 years later they built the Opera House. The ground floor has always been commercial space and on the corner was the Jaffa Bros. store. The wide staircase in the center of the Main Street front led to the opera house auditorium upstairs, which seated 800 and featured a magnificent oval stained glass skylight. It was a sensation and immediately became the social center as well as the entertainment center for the little frontier town.

Although the core integrity of the structure has been compromised by age, the building's exterior still has some of the finest stonework in the city. Note in particular the designs on the building's second story columns. They look somewhat like Southwest Indian symbols and seem out of place on a Victorian building. However similar designs decorate another nearby building constructed a few years after the Opera House, so either the designs are not so out of character, or else there was a local stoneworker who favored Southwest Native American designs.

As with most so-called opera houses in the West, precious little opera was ever performed here. However, when the curtain came down for the final time in 1906, the stage had boasted some of the nation's finest entertainers but had also featured, in the words of a local editor, "some of the rottenest barnstorming aggregations that ever escaped scalping." Between bookings, the place was frequently used for socials, dances and gatherings of various clubs and leagues, including an anti-cigarette league in the early 1900s - nothing is new!`,
    coordinates: { lat: 37.1693, lng: -104.5069 }
  },
  {
    id: 3,
    name: 'Fox Theatre',
    description: '423 W. Main St.',
    images: [
      { url: '/images/fox1.jpg', alt: 'Fox Theatre exterior' },
      { url: '/images/fox2.jpg', alt: 'Fox Theatre facade' },
      { url: '/images/fox3.jpg', alt: 'Fox Theatre detail' }
    ],
    audioUrl: '/audio/fox.mp3',
    transcript: `Fox Theatre: 423 W. Main St.

From here is the best vantage point for admiring the huge bulk of the Fox West Theatre, across the street to the west. Built by the same Edward West of the vast sheep flocks who built the West Block we just spoke of. Opened in 1908 as a venue for traveling Vaudeville acts, the Fox (named the West Theatre until the 1940s) was designed by the Rapp Brothers firm of Trinidad. It was one of the grandest theatres in the state --- indeed, in the West --- and many of its fine facilities and ornate details remain in the interior, though the street level façade has been extensively changed. Originally, twin Corinthian columns stood on either side of the entrance. They have disappeared but the handsome balustrade still decorates the top of the second story. The high-rising third (really, the fourth) floor at the rear of the building houses the intricate machinery for special effects on the stage and stores the many backdrops that were available for stage scenery.

The main auditorium seems limitlessly high with ornate, gilded carving on the front of the balconies and private loges along the side. It boasts a seventy-one-foot stage that has hosted a wide array of history's famous performers, including John Philip Sousa, Mother Jones, Roy Rogers, Sitting Bull, Rube Welch, violinist Rubinoff and many others. It seats 650 people and has received an award from the Colorado Historical Theatre Association for being the only remaining theatre in Colorado with a double-tiered balcony. In the basement, was a large ornate ballroom where orchestras played several times a week. The theatre was fully converted into a motion picture theater in 1929 and was operated as such until its closure in 2012.

In 2018, the historic building was purchased by the City of Trinidad and with the support of History Colorado and in partnership with Urban Neighborhoods, Inc, preservation of this architectural and cultural gem has begun.

You now stand in Trinidad's once-infamous West Main street, for years the area of the town's liveliest bars, brawniest gaming houses and thriving red light district. If you had walked here in the early 1900s, (you ladies wouldn't), you would have been accosted about every three steps by flouncing skirts (or their pimps) and you would have kept a sharp lookout for drunks and pickpockets. Walk on down. It's safe now.

About every four years from the 1880s until well into the 1900s, a clean-up of West Main was announced, either by the sheriff or the city police. A few raids would be made but, after elections, it was business as usual.

Return to Animas Street and turn left, to the north. The building that is now an annex of City Hall looks quite new and modern because of the unusual shape of its front windows and the glass entrance. However, it pre-dates City Hall next to it and must have been built in the 1880s, for it was used by Trinidad's first mortuary (Sipes, established in 1879) to house its horse teams, carriages, and hearse. The building has had many uses since then and has belonged to the city for years.`,
    coordinates: { lat: 37.1690, lng: -104.5082 }
  }
]
