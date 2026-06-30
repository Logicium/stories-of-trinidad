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
  /** Editorial / tourist metadata (optional) */
  era?: string
  style?: string
  duration?: string
  teaser?: string
}

export const locationsData: LocationData[] = [
  {
    id: 1,
    name: `Columbian Hotel`,
    description: `111 N. Commercial St.`,
    era: `Built 1879`,
    style: `Hotel · Lodging`,
    duration: `6 min listen`,
    teaser: `Of the four buildings on this intersection, the oldest is on the northwest corner, the Columbian Hotel, built in 1879.`,
    images: [
      { url: '/images/10134-1.jpg', alt: `Columbian Hotel` },
      { url: '/images/10134-2.jpg', alt: `Columbian Hotel` },
      { url: '/images/10134-3.jpg', alt: `Columbian Hotel` },
      { url: '/images/10134-4.jpg', alt: `Columbian Hotel` },
    ],
    audioUrl: '/audio/10134.mp3',
    transcript: `Columbian Hotel: 111 N. Commercial St.

Of the four buildings on this intersection, the oldest is on the northwest corner, the Columbian Hotel, built in 1879. It was originally called The Grand Union, presumably because of the union of the two routes of the Trail, but the owners were so carried away by the excitement over Chicago’s Columbian Exposition of 1894, celebrating the 400th Anniversary of Columbus’ discovery of the New World, that they renamed the hotel. It has been The Columbian ever since. The main entrance to the hotel has always been a few steps down Commercial Street. What looks like the main entrance on the corner has always been rented to various businesses.

For the first 50 years or so, the hotel was justifiably famous for its luxury. The exterior with ornate window trim and cast iron grates remains little changed and a recent cleaning and re-painting left the colors historically correct, according to old photographs. The hotel boasted almost 100 rooms, an impressive terrazzo-floored lobby, a lavish saloon and dining room, a rococo ballroom with a striped floor of alternating dark walnut and white ash, a gentlemen’s smoking room, a ladies “retiring” room, with gaming rooms in the basement near the barber shop. Doc Holliday reportedly added to his reputation here.

Other notables who have registered include President and Mrs. Hoover (who watched a July 4th parade while sipping tea on the second floor corner balcony), Douglas Fairbanks and his wife Mary Pickford (“America’s Sweetheart”), and every governor of Colorado until recently. Will Rogers and Wiley Post stopped here on their way to Alaska for the airplane ride on which both were killed in 1935. And when Hollywood’s top cowboy star Tom Mix slept in room 214, his famous horse Tony , known as “The Wonder Horse”, stayed in room 212. They say Tom rode the horse right up the grand staircase.

All has not been fun and games, however. During the 1913-14 coal miners’ strike when the county was at war with itself and more than one man was gunned down on Trinidad’s streets (one of them while crossing Main headed for the hotel – right there in front of you), the Colorado Militia was called in to restore order. General John Chase, a straight-backed little man who was an optometrist when he didn’t have his uniform on, promptly declared martial law and commandeered the second floor corner rooms of the hotel for his headquarters.

Imagine it is a cold January night in 1914. The streets are dimly lit by ornate Victorian street lights and streetcar tracks come up the middle of Commercial Street and go both ways out Main. But there are no streetcars now, for it is after midnight. The corner windows of the second floor are brightly lighted, however, for the strike is at its furious peak and a violent explosion is felt imminent. Indeed, the strikers are desperate. Their women and children are cold and hungry in the tent colonies set up throughout the foothills by the union because the strikers can’t remain in their company-owned houses in the coal camps. The fledgling union has been lobbying in Washington for a Congressional investigation into coal field conditions, many of which are in flagrant violation of mining laws. However, the mine operators seem to have more clout on Capitol Hill, for there is no Congressional action. To attract official attention, the strikers decided on a direct attack on the State Militia itself.

On this dark January night, shadowy figures appear on the roofs of buildings opposite the hotel and there is an occasional glint as gun barrels are aimed at figures seen through the lighted second-floor windows. Safety catches are flipped off and sharpshooters await the signal.

In the telegraph office on the hotel’s Commercial Street front, dimly lit by a naked bulb, the machine suddenly clicks into life. The message tapped out: There will be a Congressional investigation. Quickly, messengers scurry out, climb up back ways and duck along rooftops. Safety catches slide back into place and shadowy figures quietly disappear. A massacre has been averted while Trinidad slept.

The hotel went the way of most small town hotels when the era of motels came following WWII. It had a brief renaissance during the 1960s and ‘70s when new owners maintained a fine coffee shop and the public rooms were utilized for parties and meetings. After those owners retired, the building stood neglected for years. Now, other owners, with grants from the Colorado Historical Fund, have stabilized the building, repaired its roof and refurbished the street-level store fronts, which are now alive with offices and businesses. The building has been sold and there are now plans for additional apartments for our downtown area.`,
    coordinates: { lat: 37.1678948, lng: -104.505481 },
  },
  {
    id: 2,
    name: `Trinidad Opera House`,
    description: `100-116 W. Main St.`,
    era: `Built 1883`,
    style: `Theatre · Grand`,
    duration: `3 min listen`,
    teaser: `Across the street to the south is the second oldest building on the intersection, the Trinidad Opera House built in…`,
    images: [
      { url: '/images/10135-1.jpg', alt: `Trinidad Opera House` },
      { url: '/images/10135-2.png', alt: `Trinidad Opera House` },
      { url: '/images/10135-3.jpg', alt: `Trinidad Opera House` },
    ],
    audioUrl: '/audio/10135.mp3',
    transcript: `Trinidad Opera House: 100-116 W. Main St.

Across the street to the south is the second oldest building on the intersection, the Trinidad Opera House built in 1883 by the Jaffa brothers, early Jewish merchants. It is an often overlooked fact that many of the early settlers of the Old West and the builders of our towns – right alongside Hollywood’s gruff ranchers, brave school ma’arms, strong but fair saloon keepers, and prostitutes with hearts of gold – were real life Jewish merchants. The first of the Jaffa brothers, Sol, came to Trinidad in 1871 when he was 22, the town was about 10 years old, and the population was about 500. He was soon joined by his brothers Henry and Sam, and they opened the Jaffa Bros. General merchandise store. They apparently prospered, for 12 years later they built the Opera House. The ground floor has always been commercial space and on the corner was the Jaffa Bros. store. The wide staircase in the center of the Main Street front led to the opera house auditorium upstairs, which seated 800 and featured a magnificent oval stained glass skylight. It was a sensation and immediately became the social center as well as the entertainment center for the little frontier town.

Although the core integrity of the structure has been compromised by age, the building’s exterior still has some of the finest stonework in the city. Note in particular the designs on the building’s second story columns. They look somewhat like Southwest Indian symbols and seem out of place on a Victorian building. However similar designs decorate another nearby building constructed a few years after the Opera House, so either the designs are not so out of character, or else there was a local stoneworker who favored Southwest Native American designs.

As with most so-called opera houses in the West, precious little opera was ever performed here. However, when the curtain came down for the final time in 1906, the stage had boasted some of the nation’s finest entertainers but had also featured, in the words of a local editor, “some of the rottenest barnstorming aggregations that ever escaped scalping.” Between bookings, the place was frequently used for socials, dances and gatherings of various clubs and leagues, including an anti-cigarette league in the early 1900s - nothing is new!`,
    coordinates: { lat: 37.1684625, lng: -104.5055178 },
  },
  {
    id: 3,
    name: `First National Bank Building`,
    description: `100 E. Main St.`,
    era: `c. 1892`,
    style: `Commerce · Civic`,
    duration: `4 min listen`,
    teaser: `Across the street to the east is the five-story First National Bank building occupied in 1892.`,
    images: [
      { url: '/images/10136-1.jpg', alt: `First National Bank Building` },
      { url: '/images/10136-2.jpg', alt: `First National Bank Building` },
      { url: '/images/10136-3.jpg', alt: `First National Bank Building` },
    ],
    audioUrl: '/audio/10136.mp3',
    transcript: `First National Bank Building: 100 E. Main St.

Across the street to the east is the five-story First National Bank building occupied in 1892. Before it was built, the pioneer store of Davis & Barraclough stood there. On the corner, in the 1870s and ‘80s, was the city’s first fire bell high on a pole with a long dangling rope. The theory of course, was that anyone with a fire would pull the rope to call out the volunteer fire fighters, and no doubt the rest of the citizens. According to Mr. Davis, however, persons giving the alarm often were so excited, they ran into the store shouting, “Fire, fire!” and he would have to drop everything to race out and swing from the rope himself.

The bank building is faced with locally quarried sandstone in a style that might be called Richardsonian Romanesque, meaning eclectic with a little bit of everything thrown in. However, Romanesque arches dominate the façade in an unusual and interesting arrangement, being repeated at different levels. The gable spanning the five small windows with their five small Romanesque arches on the fifth floor, making the building look somewhat like it belongs in Amsterdam, is a false gable. At the point where the largest arches on the fourth floor come together is a face carved in the stone that many locals will tell you is the portrait of the stonemason’s girlfriend. They are confused. That legend applies to a face almost hidden in the stonework of the Plested Building next door. The face on the bank’s façade is bearded and must be simply a gargoyle. Two more rather Gothic visages are almost hidden in the intricate stonework on either side of the bank entrance. The bank lobby is little changed with marble, brass, and gilding. Well worth a peek!

The second floor corner windows once proclaimed the Matador Land and Cattle Company. Yes, the famous Texas ranch was headquartered here for many years. This was due to the brilliant and dynamic Murdo MacKenzie whom some call the father of modern ranching in the West because he was (perhaps) the first to import blooded European stock to upgrade Western cattle herds. MacKenzie came to Trinidad from his native Scotland in the 1880s to manage a ranch that dwarfed the Matador, the Prairie Land and Cattle Company, which controlled vast lands in open range days, all the way from new Mexico to Canada. It was British owned, as were many of the large cattle empires in those days. After a falling out with the owners, MacKenzie spent some time in South America running a large cattle outfit and then returned to accept the managership of The Matador. The first thing he did was move headquarters from Fort Worth, Texas to Trinidad, Colorado, where he preferred to live. It was after all, before the days of air conditioning. Besides, he had a lovely country retreat in magnificent Stonewall Valley some 30 miles west of here.

Another large cattle empire was controlled from the First National Bank Building, this one from a desk off the lobby. Frank Bloom (he who built the Bloom Mansion, now part of the Colorado Historical Society’s museum complex two blocks east ) called the shots for the Bloom Land and Cattle Company that stretched from around Roswell, New Mexico up to the plains of Montana. Mr. Bloom’s desk was just off the bank lobby because for years he was also vice-president of the bank.

The historic structure to the east adjacent to the First National Bank building had, for years, showed evidence of its deteriorating condition and was recently replaced. The Galleria houses retail and office space and the design is in keeping with the character of the historic downtown.`,
    coordinates: { lat: 37.1683882, lng: -104.5054066 },
  },
  {
    id: 4,
    name: `The McCormick Building`,
    description: `101-113 E. Main St.`,
    era: `c. 1889`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `The McCormick Building The building on the northeast corner of the intersection was contracted in 1889, we think.`,
    images: [
      { url: '/images/10137-1.jpg', alt: `The McCormick Building` },
      { url: '/images/10137-2.jpg', alt: `The McCormick Building` },
      { url: '/images/10137-3.jpg', alt: `The McCormick Building` },
    ],
    audioUrl: '/audio/10137.mp3',
    transcript: `The McCormick Building: 101-113 E. Main St.

The McCormick Building The building on the northeast corner of the intersection was contracted in 1889, we think. The records are not clear. It is called the McCormick Building, but seems to have been built by John Packer who built several other major buildings in the downtown area. David McCormick acquired it in 1901 and it was after that the building took on its present character with the addition of what architects call oriels, but the rest of us know as bay windows. The handsome cornices and decorative moldings were probably added at the same time. New owners more recently extensively remodeled the office spaces on the second floor to create their home. They refurbished the store fronts, adding the new awnings and a new dark green and gold paint job with gilt emblazoning the medallions.

The corner store seems to have been a cigar store for most of the building’s life and it was from there that sports fans, drinking beer from next door and blocking traffic in the intersection, heard a play-by-play account of the 1920 World Series baseball game. By arrangement with the local newspaper, the Associated Press line was connected to the Trinidad Cigar Store and a fast-working operator decoded the dots and dashes before handing the game-play to a man with a megaphone. The Cleveland Indians beat the Brooklyn Dodgers 3-1 in 1920 and Trinidad heard it with just a few seconds delay.

Sign of the times: With no men seeking a fine cigar or aromatic pipe tobacco, the cigar store finally succumbed to other retail shops, presently an antique store.`,
    coordinates: { lat: 37.1686491, lng: -104.5056159 },
  },
  {
    id: 5,
    name: `Poitrey Building`,
    description: `125-137 N. Commercial St.`,
    era: `Est. 1888`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `Window shop some up-scale boutiques as you walk north.`,
    images: [
      { url: '/images/10139-1.jpg', alt: `Poitrey Building` },
      { url: '/images/10139-2.jpg', alt: `Poitrey Building` },
    ],
    audioUrl: '/audio/10139.mp3',
    transcript: `Poitrey Building: 125-137 N. Commercial St.

Window shop some up-scale boutiques as you walk north. The historic Poitrey Building erected in 1888 has been renovated to resemble the original architectural style lent to the community by the Rapp Brothers. The historic integrity of the building was maintained throughout the revitalization process of the building, now known as the Champions Building. Another interior worth a look! Old photos show the building was quite ornate with decorative window lintels and an overhanging cornice that made it a good match for the hotel. However, following World War II, the urge to “modernize” that swept the country seized this town and the lintels and cornices were removed. Fortunately, most owners of the downtown buildings didn’t have the money to do that and Trinidad therefore has one of the largest inventories of original, historic architecture in the southern portion of Colorado.

Look north down Commercial Street. In the 1860s, when new buildings were springing up beside the long-established trail, an effort was made to straighten the street. As you can see, the results were rather indifferent due to the howls of building owners who would have had to move their adobes back several yards. And not only building owners protested. Records show that the town council agreed to pay one man $16.80 for his bean crop that was ruined in the process. But Commercial Street remains crooked.`,
    coordinates: { lat: 37.1679479, lng: -104.5055148 },
  },
  {
    id: 6,
    name: `Toltec Hotel`,
    description: `118-128 N. Commercial St.`,
    era: `Built 1910`,
    style: `Hotel · Lodging`,
    duration: `2 min listen`,
    teaser: `Across the street is the Toltec Hotel, built in 1910-11.`,
    images: [
      { url: '/images/10140-1.jpg', alt: `Toltec Hotel` },
      { url: '/images/10140-2.jpg', alt: `Toltec Hotel` },
      { url: '/images/10140-3.jpg', alt: `Toltec Hotel` },
    ],
    audioUrl: '/audio/10140.mp3',
    transcript: `Toltec Hotel: 118-128 N. Commercial St.

Across the street is the Toltec Hotel, built in 1910-11. It was along about that spot where in the 1870s, a young cowboy in town for his monthly binge and overly bibulous, was shot. He’d been warned twice by the sheriff against riding up and down the street firing his gun into the air and when he persisted the sheriff shot him. Dead. But as the man who told the story commented at the time, “The law must be enforced.” These days, they’d blame the barkeep.

Although the hotel always catered to commercial travelers and made no pretensions to the luxuries of the Columbian, it had some fine architectural details in the lobby and the facade is classically handsome with beautiful stonework on the first floor and across the top. With the decline of downtown hotels, it became a rooming house for a while, then stood empty and deteriorating for decades. Deemed a hazard, it was reluctantly condemned by the city but the demolition order was held in abeyance. It has been restored and refurbished, now housing street level commercial spaces, with the upper floors being "condo-type apartments," whatever that means. On the empty lot to the north is tenant parking and an elevator.`,
    coordinates: { lat: 37.16805799999999, lng: -104.5052014 },
  },
  {
    id: 7,
    name: `Holy Trinity Church`,
    description: `135 Church St.`,
    era: `Built 1866`,
    style: `Sacred · Landmark`,
    duration: `4 min listen`,
    teaser: `Turn left onto Church Street.`,
    images: [
      { url: '/images/10141-1.jpg', alt: `Holy Trinity Church` },
      { url: '/images/10141-2.jpg', alt: `Holy Trinity Church` },
      { url: '/images/10141-3.jpg', alt: `Holy Trinity Church` },
      { url: '/images/10141-4.jpg', alt: `Holy Trinity Church` },
    ],
    audioUrl: '/audio/10141.mp3',
    transcript: `Holy Trinity Church: 135 Church St.

Turn left onto Church Street. The first Catholic Church in town was built in 1866 as a dirt-floored adobe with a steeple and bells but no ceiling, so pigeons flew about and billed and cooed, and did other things during Mass. The first priest was a Diocesan named P.J. Munnecom, a hearty and likeable Dutchman, whose great passions in life were the church, poker, and dealing in real estate, not necessarily in that order. One of his poker playing pals stated that the father sometimes became so engrossed in the game that he'd forget evening vespers until his impatient parishioners rang the church bells. The father would look up, startled, throw down his cards, and exclaim, “There go those damned bells again!” Eventually, because Fr. Munnecom seemed to spend more time swapping Trinidad land than attending to his flock’s needs, Archbishop Lamy in Santa Fe (yes, the same archbishop to whom death came in Willa Cather’s famous novel) decided that the good father might not be the best father for the parish and suspended him from duty. Shortly after, Munnecom, having made a handsome retirement from Trinidad real estate, returned home to Holland.

When the new priests, Jesuits, arrived in 1875, they took one horrified look at the adobe church and began fund-raising efforts. On land donated partly by a Catholic rancher and partly by a Jewish merchant, the new church rose across the street. At the time, it was dedicated in 1885, it was termed the most beautiful in Colorado, although the Gothic Revival steeple was not added until the 1890s. The sanctuary is normally open during daylight hours, so step (quietly) inside to admire the 60-foot barrel-vaulted ceiling, the lovely stained glass windows, the beautiful statues of the apostles, and the bas-relief Stations of the Cross.

Across the street to the west, where the parochial school buildings now stand, was the site of the town’s first public schools. When the Sisters of Charity arrived in 1870, in response to an appeal by city fathers to the Church, they were to found a parochial school. The Trinidad School Board, which was charged with starting a public school but had never managed it, asked the Sisters if they would also run a public school. They agreed, although two of the original three sisters had to be sent on to Santa Fe in exchange for two others who spoke Spanish. Remember this had been U.S. territory for just a few years, and the vast majority of the population spoke only Spanish. Having opened the first School District in the state of Colorado, School Dist. #1, the Sisters ran Trinidad’s public school for 22 years.

Sister of Charity Blandina Segale wrote in her letters to her sister, “Summer of 1892. I’m to meet the School Board. We met. The intent of the meeting was to notify me that “under no circumstances does the school board want to lose your services, but we ask you to change your mode of dress.” I looked steadily at the Chairman and replied: “The Constitution of the United States gives me the same privilege to wear this mode of dress as it gives you to wear your trousers. Good-bye. . . .” Sister Blandina continues, “So this is the end of twenty-two years’ work in Public School Number One, opened in 1870 when Trinidad was mostly governed by the best shotmen and sheriff’s lead, mobs to hang murderers, and jail birds never come to trial, and the life of a man was considered a trifle compared to the possession of a horse.” A pocket garden in Sister Blandina’s venerable honor is now located along a walking path from Holy Trinity Church to the east.`,
    coordinates: { lat: 37.1693498, lng: -104.5074989 },
  },
  {
    id: 8,
    name: `Chronicle News Building`,
    description: `200 Church St.`,
    era: `Est. 1900`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `Unfortunately, the Catholic Diocese decided to close the Catholic school, although it was one of only a few K-12…`,
    images: [
      { url: '/images/10143-1.jpg', alt: `Chronicle News Building` },
    ],
    audioUrl: '/audio/10143.mp3',
    transcript: `Chronicle News Building: 200 Church St.

Unfortunately, the Catholic Diocese decided to close the Catholic school, although it was one of only a few K-12 parochial schools in the state. Outraged Trinidad Catholic parents and alumnae promptly formed the Holy Trinity Academy, which successfully runs an “independent” Catholic school in what was for decades, The Chronicle News building. Constructed in 1900 with the second story added in 1912, the newspaper first utilized hot lead type in 1887. The Chronicle-News has been a part of the community for 125 years -when Trinidad was nothing but a mining camp, when Bat Masterson was the town Marshall, through floods and fire, feast and famine, the newspaper was a part of the life of generations of people! During national elections in the pre-radio days of 1908, election returns were scribbled on the glass slide of a stereopticon and projected onto the school’s wall across the street. For those who didn’t want to stand out in the November night, the newspaper sent up skyrockets at pre-arranged intervals, one if the Republicans were ahead, two if the Democrats led. Although no longer located in this historic building, The Chronicle News is still one of the oldest continuously published newspapers in Colorado! Notice the curved glass sash window on the corner, one of only two left in town, which was once a popular architectural feature in many buildings throughout the city.`,
    coordinates: { lat: 37.1685234, lng: -104.5069537 },
  },
  {
    id: 9,
    name: `Schneider Brewery`,
    description: `240 N. Convent St.`,
    era: `Built 1888`,
    style: `Trade · Social`,
    duration: `3 min listen`,
    teaser: `Stroll north (right) on Convent Street.`,
    images: [
      { url: '/images/10144-1.jpg', alt: `Schneider Brewery` },
      { url: '/images/10144-2.jpg', alt: `Schneider Brewery` },
      { url: '/images/10144-3.jpg', alt: `Schneider Brewery` },
    ],
    audioUrl: '/audio/10144.mp3',
    transcript: `Schneider Brewery: 240 N. Convent St.

Stroll north (right) on Convent Street. The Sister’s convent, now at the far west end of the school building, used to stand on this street. At the Church Rectory, look across at the handsome building that could easily stand in the Tuscan country of Northern Italy. This was the Schneider Brewery, the first portion of which was built in 1888 on ground purchased from the Church. For many years, it was a major industry in town and its Century beer sold throughout the Southwest. You can see how the brewery expanded by noting the different types of brick in the façade, although efforts were made to match architectural details. The company’s headquarters were on the corner and the bottling plant was across Plum Street. A metal pipe used to dangle over Convent Street. It spewed out the used mash from the brewing process into waiting wagons to be hauled off for cattle feed. (Did the cows get tipsy?) During Prohibition, the brewery bottled soft drinks, but in 1929, the Van Vleet interests, who foresaw the end of the non-alcohol era, which came in 1933, purchased the business. Although the Van Vleets had plenty of monetary strength (their Trinidad Bean and Elevator Company operated in seven states and you’ll see their magnificent home in the East Main Street walk), their efforts to reestablish Century beer were overwhelmed by the advertising and marketing strategies of emerging national brands. The brewery stands empty, but with all the development going on in downtown Trinidad, one of these years, someone with the ideas and the capital will make it magnificent again. We hope.

Little Plum street, which you cross here, is so crooked because it is a paved-over mill stream. Water diverted from the river several blocks west of here powered Trinidad’s first and only flour mill for several years in the 1870s. After the mill closed, the stream was simply filled in and became Plum Street. At one time, there were seven Chinese laundries listed in the city directory and five of them were on Plum Street. There were also two saloons along the street. History does not record if that led to many scorched shirts.

Walk on down the wide sidewalks on either side of Convent Street. On your left is a riverside city park with several pleasant picnic areas and well-equipped playgrounds. It is named for Jay Cimino, a very successful Trinidadian who has done much for his old hometown. On your right, is the handsome International Bank building, certainly not historical but designed in a modern, vaguely Southwest style that blends pleasantly.`,
    coordinates: { lat: 37.1690766, lng: -104.5069088 },
  },
  {
    id: 10,
    name: `Trinidad Water Works`,
    description: `223 E. Cedar St.`,
    era: `Est. 1879`,
    style: `Civic · Public`,
    duration: `4 min listen`,
    teaser: `Ahead of you are the high steep twin gables of the second oldest building still standing in Trinidad.`,
    images: [
      { url: '/images/10145-1.jpg', alt: `Trinidad Water Works` },
      { url: '/images/10145-2.jpg', alt: `Trinidad Water Works` },
    ],
    audioUrl: '/audio/10145.mp3',
    transcript: `Trinidad Water Works: 223 E. Cedar St.

Ahead of you are the high steep twin gables of the second oldest building still standing in Trinidad. This was the water works building constructed in 1879. It housed the pump that pushed water from a deep well right beside the river to a reservoir on a hill above town (still called Reservoir Hill and now the site of a modern metal reservoir that is part of the city’s water system.) From there, the water flowed by gravity through pipes to the homes of subscribers. It was a private enterprise, owned and operated by Delos Chappell, whose mansion is on the East Main Street walk. At first, he had trouble getting subscribers to his new waterworks, although the alternative was buying water by the bucket from vendors whose horse-drawn wagons circled through town selling from open barrels taken directly from the river, upstream of which everyone knew cattle waded, drank, and—well, you know. Part of his problem was that Mr. Chappell himself didn’t subscribe, which led to all sorts of rumors about the quality of the water. His mansion had its own built-in water system. Another problem was his rates, which sound extortionately high and certainly must have led to Saturday-night-only baths. The city bought the waterworks in the 1890s.

At the intersection of Convent and Cedar Streets, we intercept the River Walk, which has skirted the edge of the park and here crosses the street beside the Waterworks Building to continue beside the river. It is a lovely walk with interesting history markers that you’ll want to enjoy. Save it for another day. For now, turn right on Cedar Street, staying on the south side where there is a sidewalk.

Until recently, this was a deserted, seedy warehouse district with railroad tracks down the middle of the potholed street. Hardly anyone ever even drove down it. But then the bank built here, the city took up the tracks and re-bricked the street, and several of the warehouses were imaginatively refurbished. The first one across the street from you was the home of the Mason Candy Company, that started as a creamery, branched into ice cream, and then into candy, boxes of which were prized throughout the region. However, when the last Mason retired, no one took over and the sturdy building stood forlorn for more than 40 years.

Return to Commercial Street and turn left (north) toward the river. In the early 1900s, when the coal fields were busy and Trinidad was booming, this lower part of Commercial Street, relatively quiet now, bustled and teemed with the comings and goings of business in the mercantile establishments that lined both sides. The street cars, whose rails went up the middle of the street, often had to stop and clang their bells until someone urged a recalcitrant team out of the way. Normal traffic could not get through and it was dangerous for pedestrians to cross.

Much of the trouble was caused by independent draymen, each with his sturdy wagon pulled by mules or big draft horses, who would arrive early and line the street on both sides to have an advantageous position for a freight-hauling job. They vied with each other, shouting and cursing, and making dangerous dashes for good parking places. And they caused patrons to have to “double park” while they shopped, thus blocking the street. Finally in 1908, city council passed an ordinance requiring the draymen to wait in off-street spaces until they had a job. It worked, sort of, when there was a policeman around, but traffic on Commercial remained congested and dangerous.`,
    coordinates: { lat: 37.1712852, lng: -104.5063631 },
  },
  {
    id: 11,
    name: `Colorado Hotel`,
    description: `401-407 N. Commercial St.`,
    era: `Built 1905`,
    style: `Hotel · Lodging`,
    duration: `2 min listen`,
    teaser: `On the Northwest corner of Commercial and Cedar is a building built in 1905 with store fronts on the first floor and…`,
    images: [
      { url: '/images/10146-1.jpg', alt: `Colorado Hotel` },
    ],
    audioUrl: '/audio/10146.mp3',
    transcript: `Colorado Hotel: 401-407 N. Commercial St.

On the Northwest corner of Commercial and Cedar is a building built in 1905 with store fronts on the first floor and renovated apartments above. Over the doorway to the apartment staircase is the name “Bell Block”. This is confusing, since there is an earlier and better known Bell Block on East Main. The buildings and the Bells don’t seem to be related.`,
    coordinates: { lat: 37.1711, lng: -104.5069302 },
  },
  {
    id: 12,
    name: `Trinidad Hotel`,
    description: `421 N. Commercial St.`,
    era: `Built 1900`,
    style: `Hotel · Lodging`,
    duration: `2 min listen`,
    teaser: `The next building of note is at 421 North Commercial, the former Trinidad Hotel, which now houses on its ground…`,
    images: [
      { url: '/images/10147-1.jpg', alt: `Trinidad Hotel` },
      { url: '/images/10147-2.jpg', alt: `Trinidad Hotel` },
    ],
    audioUrl: '/audio/10147.mp3',
    transcript: `Trinidad Hotel: 421 N. Commercial St.

The next building of note is at 421 North Commercial, the former Trinidad Hotel, which now houses on its ground floor the Trinidad Lounge. It is another building whose brightly hued paint job highlights architectural details. The historic Building Survey says the hotel was built in 1900, but photographs from the 1880s show a Trinidad Hotel here, although it appears to be a different building with a mansard roof.`,
    coordinates: { lat: 37.1716028, lng: -104.5071128 },
  },
  {
    id: 13,
    name: `Old Adelphia Hotel`,
    description: `449-453 N. Commercial St.`,
    era: `Est. 1991`,
    style: `Hotel · Lodging`,
    duration: `3 min listen`,
    teaser: `The last building before the bridge is called the Old Adelphia Hotel in the Historic Building Survey, although it…`,
    images: [
      { url: '/images/10148-1.jpg', alt: `Old Adelphia Hotel` },
    ],
    audioUrl: '/audio/10148.mp3',
    transcript: `Old Adelphia Hotel: 449-453 N. Commercial St.

The last building before the bridge is called the Old Adelphia Hotel in the Historic Building Survey, although it first appeared in the city directory as the New Metropolitan Hotel and remained so until 1906. It’s a moot point because, although it has been used for other purposes for some time, long time residents still call it the Hausman Drug building because it was the location of that favored business for so many years. According to its sign, still visible on its river side, it was much more than a drug store, selling hunting licenses and fishing gear and featuring the town’s favorite soda fountain.

The current bridge was completed in 1991. The award-winning design replicates, as closely as modern standards allow, a bridge that had spanned the river for 86 years and had developed structural problems. It had replaced a bridge swept away by the terrible flood of 1904, which itself was a replacement for a previous bridge also swept away. Historically, the little stream could be very unruly, a situation now controlled by the Trinidad Dam and Lake constructed four miles upstream in the 1970s.

The river will be flowing full if you are here during summer irrigation season, but at other times, it is a small mountain stream, swift and clear. It is officially called the Purgatoire River. But it has a more interesting name, one with mysterious origins. In Spanish, it is called El Rio de Las Animas Perdidas en Purgatorio, the River of Souls Lost in Purgatory. And the legend goes like this. In the very early days of Spanish exploration, an expedition was wandering across the plains hoping to find the golden riches of Quivira, a legendary land supposed to lie to the northeast. The two leaders of the band, both vicious and avaricious, fell to quarreling over the direction to take and the argument became so heated that one of them stabbed and killed the other. The priests of the expedition refused to go on under the leadership of a murderer and turned back, taking many of the soldiers with them. Although depleted and weakened, the others pressed on, only to be slaughtered by hostile Indians while camped on the banks of a small river (this one?). Because the Spaniards died without Last Rites administered by priests, their souls were doomed to wander forever in purgatory. That is not correct according to the tenets of the Catholic Church, but nevertheless we have the name. Later, with the coming of French-speaking mountain men from Canada, it was shortened and changed to Purgatoire. Early settlers often twisted that into Picket-wire (pronounced “wahr”) but the U.S. Geologic Survey selected the French version.`,
    coordinates: { lat: 37.1719196, lng: -104.5072673 },
  },
  {
    id: 14,
    name: `Firehouse #1`,
    description: `413 N. Commercial St.`,
    era: `Est. 1895`,
    style: `Civic · Public`,
    duration: `2 min listen`,
    teaser: `Walk on the east side of the street for a better view of some of the buildings you have passed.`,
    images: [
      { url: '/images/10149-1.jpg', alt: `Firehouse #1` },
      { url: '/images/10149-2.jpg', alt: `Firehouse #1` },
    ],
    audioUrl: '/audio/10149.mp3',
    transcript: `Firehouse #1: 413 N. Commercial St.

Walk on the east side of the street for a better view of some of the buildings you have passed. In the middle of the second block, you will come to a narrow little building with (permanently closed) folding double doors through which the horse-drawn fire wagon could come flying out. Still called Firehouse No. 1, in the cellar is Trinidad’s original jail, a dank, catacomb-like affair that will send shivers up most adults as well as children. The building was known as City Building when it was constructed in 1895 (or 1888 depending on whose records you trust) and was city council chambers as well as city offices, the police department and the fire department. The whole shebang cost $5,000 when it was built and since 1980 over $65,000 have been spent restoring and refurbishing it.`,
    coordinates: { lat: 37.1713695, lng: -104.5071357 },
  },
  {
    id: 15,
    name: `Savoy Hotel`,
    description: `309-313 N. Commercial St.`,
    era: `Built 1893`,
    style: `Hotel · Lodging`,
    duration: `2 min listen`,
    teaser: `At the end of the block, across the street, is first the Savoy Hotel, built in 1893, which still operates as a…`,
    images: [
      { url: '/images/10150-1.jpg', alt: `Savoy Hotel` },
      { url: '/images/10150-2.jpg', alt: `Savoy Hotel` },
    ],
    audioUrl: '/audio/10150.mp3',
    transcript: `Savoy Hotel: 309-313 N. Commercial St.

At the end of the block, across the street, is first the Savoy Hotel, built in 1893, which still operates as a hostelry catering to semi-permanent residents.`,
    coordinates: { lat: 37.1705825, lng: -104.5067108 },
  },
  {
    id: 16,
    name: `Longnecker Building`,
    description: `301 N. Commercial St.`,
    era: `c. 1876`,
    style: `Historic · Downtown`,
    duration: `3 min listen`,
    teaser: `On the corner is the Longnecker Building with interesting brick detailing and four handsome bay windows on its Plum…`,
    images: [
      { url: '/images/10151-1.jpg', alt: `Longnecker Building` },
    ],
    audioUrl: '/audio/10151.mp3',
    transcript: `Longnecker Building: 301 N. Commercial St.

On the corner is the Longnecker Building with interesting brick detailing and four handsome bay windows on its Plum Street side. At this point, Commercial Street has an unexplained jog and widening that leads some historians to believe the original Santa Fe Trail curved and continued down the narrow street behind Griego Insurance Building. Now known as Mill Street because of Marty Feed Mill, it ends at the railroad tracks on Cedar Street, but formerly continued down to the river, connecting to the original bridge spanning the stream some 200 yards east of today’s bridge. Two doors up from Plum Street at 234 Commercial is a building built by one of Trinidad’s most famous citizens, Casimero Barela, who was the area’s state senator for so long (1876-1914) that he became known in Denver as well as here as the Perpetual Senator. Before 1876, when Colorado became a state, he was the area’s representative to the Territorial Legislature and helped draft the State Constitution. His portrait is one of 16 that surround the rotunda of the State Capitol Building. A rancher and self-made man who became ever wealthier, he built this building in 1883.

One of the renters of the building (who later bought it) was another of Trinidad’s best-known citizens, Dr. Michael Beshoar, the first medical doctor in southern Colorado and Northern New Mexico. Along with his many other activities, Dr. Beshoar founded Trinidad’s first daily newspaper, the Daily Advertiser, with his offices and presses in this building. Dr. Beshoar was not at all reticent about his opinions and he stated them boldly in his newspaper, leading to many heated arguments and attacks on him, both verbal and physical. They tell the story of when the doctor, a small man who normally carried a gun under the red vest he habitually wore, was surprised by an intruder who threatened him because of something printed in the paper. Dr. Beshoar was for once caught without his gun but reached into his hip pocket where he had a very sharp knife. To defend himself, he stabbed the man. Then, when the man was sufficiently subdued, he used his medical skills to repair the damage.

In recent years, the building has housed a series of businesses and stood vacant for some time. Most recently, it was renovated to be a fine art photography studio and upstairs living quarters, modernized with expansive windows but preserving the ornate lintels over the second story windows and the historic pressed tin cornice.`,
    coordinates: { lat: 37.1704048, lng: -104.5066591 },
  },
  {
    id: 17,
    name: `First Presbyterian Church`,
    description: `224 N. Commercial St.`,
    era: `c. 1902`,
    style: `Sacred · Landmark`,
    duration: `2 min listen`,
    teaser: `The large, elevated brick building next door was built as the United Presbyterian Church in 1902.`,
    images: [
      { url: '/images/10152-1.jpg', alt: `First Presbyterian Church` },
      { url: '/images/10152-2.jpg', alt: `First Presbyterian Church` },
      { url: '/images/10152-3.jpg', alt: `First Presbyterian Church` },
    ],
    audioUrl: '/audio/10152.mp3',
    transcript: `First Presbyterian Church: 224 N. Commercial St.

The large, elevated brick building next door was built as the United Presbyterian Church in 1902. Its pastor at the time had a degree in architecture and designed a Gothic, somewhat Teutonic, building with crenellated towers that, thankfully, were later removed. Several years ago, the congregation had dwindled so much that the members felt they could not afford to maintain the building and make several expensive repairs. At about the same time, the Baptist Church, which had a still sturdy building but a likewise diminished congregation, found it needed additional help to maintain its sanctuary. So, they gave their building to the Presbyterians and mingled the congregations, for those members who agreed. It could happen only in a small city with well-meaning people.`,
    coordinates: { lat: 37.1701426, lng: -104.5061178 },
  },
  {
    id: 18,
    name: `Sherman Building`,
    description: `422 N. Commercial St.`,
    era: `Built 1885`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `Just beyond are two handsomely painted frame buildings.`,
    images: [
      { url: '/images/10153-1.jpg', alt: `Sherman Building` },
      { url: '/images/10153-2.jpg', alt: `Sherman Building` },
    ],
    audioUrl: '/audio/10153.mp3',
    transcript: `Sherman Building: 422 N. Commercial St.

Just beyond are two handsomely painted frame buildings. The one on the corner is called the Sherman Building and first housed the Sherman Grocer Company, Wholesale, and Retail. It was built in 1885 in late Victorian style with cast iron columns enhancing the façade. It and the next building are now combined into an antique and gift shop.

In the 1970s, Elm Street, the side street here, was lively and rowdy with saloons and gambling halls and we are told that the most raucous saloon was on the corner where there is a city parking lot today. Perhaps that’s where the cowboy whom the sheriff killed for firing bullets into the air got all of his spirit(s).`,
    coordinates: { lat: 37.1718007, lng: -104.5066352 },
  },
  {
    id: 19,
    name: `Plested Building`,
    description: `112 E. Main St.`,
    era: `Est. 1889`,
    style: `Historic · Downtown`,
    duration: `6 min listen`,
    teaser: `Walk on the north side of the street so you can see the buildings across the way.`,
    images: [
      { url: '/images/10155-1.jpg', alt: `Plested Building` },
      { url: '/images/10155-2.jpg', alt: `Plested Building` },
    ],
    audioUrl: '/audio/10155.mp3',
    transcript: `Plested Building: 112 E. Main St.

Walk on the north side of the street so you can see the buildings across the way. We’ll return on the other side. For a description and discussion of the five-story bank building, listen to the account of the Intersection of Main and Commercial in the Introduction.

The two-story building just east of the bank looks, because of similar sandstone and design, like an extension of the bank and, indeed, now is. In 1990-91, the bank broke through the common wall and did extensive interior remodeling to gain some badly needed breathing space. Until then, the building was known locally as the Plested Building, after the family that owned it for many years. It was originally known as the Post Hardware Company and then later, the Branson-Griswold Hardware Store. The first floor of the building is constructed of 3 inch by 14 inch beams on 12 inch centers with cross bracing, this to support carts that weighed many hundreds of pounds. Its façade is decorated with Romanesque arches above the second story windows with a delicate scroll above the arches. But the most intriguing and talked-about detail is the face of a woman just above the lower right column. The story is that the mason fell madly in love with a local madam of the “House is not a Home” variety and carved her portrait into stone. Surreptitiously, he slipped the stone into place as an everlasting tribute to her. From the expression, she must have been a rather dyspeptic lover.

Upstairs in this building was the Aultman Photography Studio, opened in 1889 by Oliver Aultman and in business until 2000, when son Glenn died at age 95. The studio recorded 100 years of street scenes in Trinidad, shots of coal camps long gone, and portraits of family groups (several in which one member of the family is dead --- usually the father killed in a mining accident --- and simply propped up). A portion of the huge collection is on display in the lower level of the A.R. Mitchell Museum of Western Art just down the block. Be sure to see it.

Next door was another two-story building made of brick in 1880. Three Romanesque arches over the larger windows were echoed by decorative arches over the smaller ones. Multiple brick cornices topped by small urns decorated this rather simple, unaffected building. During its existence, the first floor consisted of a famous bakery with multiple owners over the years. On the second floor, the building housed a dance studio and a suite of offices among other businesses. This building had become unstable and was razed in 2016 in preparation for the construction of the present day Galleria.

At about this spot in the early days of the city, a deep ravine, which is confined within a culvert that lies beneath today’s Galleria, cut across Main Street. For a time, it was crossed only by a narrow footbridge. And thereby hangs a tale.

Some three blocks west on Main Street, in 1872, was the famous Exchange Saloon. One bright February day, a bunch of cowboys from Texas, including the three Wilson brothers, rode into town. Leaving their horses at a livery stable on the other side of the ravine, they sauntered across the bridge and through town, stopping off here and there at saloons and places of more intimate entertainment until one of the Wilson brothers ended up at the Exchange. A few drinks later, he decided he was being cheated at the gaming table (possible) and stormed out, swearing he would return.

While he was gone, the bartender sent for Sheriff Juan Tafoya, who stood quietly by as all the cowboys burst back in, guns at ready. The saloon offered to return Wilson’s money but the cowpoke said no, that someone was going to die. The sheriff stepped forward to grab Wilson’s gun as Wilson whirled and fired. Tafoya became the first Trinidad sheriff to die on the job.

The cowboys backed out and ran hell-for-leather for the livery stable with a shouting mob racing to catch them. After racing across the footbridge, one of the Wilsons whipped around and with leveled rifle, said the first pursuer on the bridge was a dead man. He held off the town while his buddies saddled horses and they all galloped away. (Later, they were dealt with by a posse.)

In the next year, 1873, the footbridge was washed away by a flood and soon replaced by a 60-foot-wide bridge so Main Street could be continuous. The Ravine, diverted and culverted, still runs under the town. It is visible near the corner of Commercial and 1st Street and again at Elm and Chestnut.`,
    coordinates: { lat: 37.1684387, lng: -104.5054562 },
  },
  {
    id: 20,
    name: `Masonic Building`,
    description: `132 E. Main St.`,
    era: `Est. 1911`,
    style: `Fraternal · Social`,
    duration: `2 min listen`,
    teaser: `The next building of interest is the very ornate three-story Masonic Building, constructed in 1911 with great…`,
    images: [
      { url: '/images/10156-1.jpg', alt: `Masonic Building` },
      { url: '/images/10156-2.jpg', alt: `Masonic Building` },
      { url: '/images/10156-3.jpg', alt: `Masonic Building` },
      { url: '/images/10156-4.jpg', alt: `Masonic Building` },
    ],
    audioUrl: '/audio/10156.mp3',
    transcript: `Masonic Building: 132 E. Main St.

The next building of interest is the very ornate three-story Masonic Building, constructed in 1911 with great exuberance. Ionic columns separate the decorated Romanesque arches, several of which bear various Masonic symbols. The ornate cornice is topped by two wreathes in stonework. The Trinidad Masonic Temple Association still occupies the two upper floors. Street level has always been commercial.`,
    coordinates: { lat: 37.168645, lng: -104.5050499 },
  },
  {
    id: 21,
    name: `The Mitchell Museum`,
    description: `150 E. Main St.`,
    era: `Est. 1905`,
    style: `Residence · Museum`,
    duration: `4 min listen`,
    teaser: `In sharp architectural contrast is the Colorado Building just to the east, which, despite its contemporary…`,
    images: [
      { url: '/images/10157-1.jpg', alt: `The Mitchell Museum` },
      { url: '/images/10157-2.jpg', alt: `The Mitchell Museum` },
      { url: '/images/10157-3.jpg', alt: `The Mitchell Museum` },
      { url: '/images/10157-4.jpg', alt: `The Mitchell Museum` },
    ],
    audioUrl: '/audio/10157.mp3',
    transcript: `The Mitchell Museum: 150 E. Main St.

In sharp architectural contrast is the Colorado Building just to the east, which, despite its contemporary appearance is the older building, constructed in 1905. Very forward looking with its great expanses of show windows on both the first and second floors, the building for most of its life housed the Jamieson Department Store, until recently one of the most venerable retailers in town. Founded in 1889 and famed throughout Southern Colorado and Northeast New Mexico for the fine quality of its goods, it was for decades the “Neiman Marcus” of the area, where women bought special dresses and brides “registered” their wish lists. Not until the 1980s did it go the way of most small town department stores.

It seems appropriate that a building associated with such fine quality should become the permanent home of the A.R. Mitchell Memorial Museum of Western Art, which moved here in 1991. “The Mitchell” soon became a top cultural attraction, bringing to the little city exhibits by many of the best contemporary Western artists, as well as displaying its own permanent collection, which is built around more than 250 original paintings by Trinidad’s Arthur Roy Mitchell. Mitchell, born in 1889 on a homestead just west of town, grew up about seven blocks from the museum, was briefly a cowhand on local ranches, and in the 1920s and ‘30s, operated in New York as one of the country’s most sought-after illustrators of western fiction magazines, producing over 160 magazine covers as well as book illustrations, and setting a style for fictionalized cowboys that Hollywood copied. In 1942, diagnosed with cancer, he came home to die, but lived another 35 years, teaching art at Trinidad State College and acting as the driving force behind the establishment of the Colorado Historical Society’s museum complex in Trinidad, of which he was the first curator.

Although he became almost as famous as a regional historian, he continually developed his art, which brought him many honors, including selection as one of the first academicians of the National Academy of Western Artists, election to the highly selective Cowboy Artists of America, and receipt of the Trustee’s Award from the National Cowboy Hall of Fame and Western Heritage Center. An increasingly irascible old coot, he got so he wouldn’t sell a painting except to people he liked (which was not many) and then sometimes only if they would let him tell them exactly where to hang it and how to light it. Consequently, when he died in 1977, he left a huge collection of unsold work, which the museum now has.

The museum’s 17,000 square feet also display original paintings by other well-known illustrators, friends of Mitchell, such as Harvey Dunn, Harold Von Schmidt, Nick Eggenhofer, and others. Mitchell’s eclectic accumulation of Western and Indian artifacts is in display cases and rotating exhibits of contemporary artists are usually on the mezzanine. On the third floor is the 1st Street Gallery, a space often utilized for rotating exhibits of art, summer arts and crafts classes for Trinidad youth, and other cultural activities.`,
    coordinates: { lat: 37.1685835, lng: -104.5044965 },
  },
  {
    id: 22,
    name: `Carlisle Building`,
    description: `201 E. Main St.`,
    era: `c. 1880`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `On the northeast corner of the upcoming intersection of Main and Maple is the Carlisle Building, about 80 years old…`,
    images: [
      { url: '/images/10158-1.jpg', alt: `Carlisle Building` },
    ],
    audioUrl: '/audio/10158.mp3',
    transcript: `Carlisle Building: 201 E. Main St.

On the northeast corner of the upcoming intersection of Main and Maple is the Carlisle Building, about 80 years old and therefore one of the youngest on this tour. Its Spanish Mission style is particularly appropriate on the Trail to Santa Fe. As an aside, no one knows who Carlisle was. The best guess is an Eastern or mid-Western entrepreneur who financed the building and possibly was never even in town.

Across the street to the south was formerly the site of Trinidad’s first stage stop. The grandly named United States Hotel was a six-room adobe with one public room that was the lobby, bar, and dining room. Nevertheless, passengers who arrived on the dusty Barlow and Sanderson stages must have been glad to see it after a week’s trip across Kansas. That tiny structure had been replaced by a much grander two-story adobe building by the time ex-General and ex-President Ulysses S. Grant came to town in 1880. Practically every carriage and wagon in town was in the entourage that met him at the railroad station and escorted him here. That night, he was honored with a grand banquet and the list of town and county officials who made welcoming speeches looked interminable. Reading it, one begins to understand the General’s reputation for over-imbibing.

As early as 1872, parties were fighting to get hold of the very desirable property next to the hotel and stage stop. There were dishonored sales, lawsuits, countersuits, and charges of malfeasance against some of our most prominent and beloved pioneers and officials, a squabble that went on well into the 1900s. The present building was erected about 1910 and was, for years, a professional center for doctors, lawyers, dentists, and accountants.

The building at the end of the block was once a livery stable. Later flowing with the times, it became an automobile dealership and then stood empty for years. At this recording, it now houses Coin Dancer Antiques, where you might very well find period pieces dating back to its early days as a stable.`,
    coordinates: { lat: 37.1693023, lng: -104.5041553 },
  },
  {
    id: 23,
    name: `U.S. Post Office`,
    description: `301 E. Main St.`,
    era: `Built 1910`,
    style: `Historic · Downtown`,
    duration: `4 min listen`,
    teaser: `From the Baca House looking south is located one of the town’s three buildings listed in the National Registry of…`,
    images: [
      { url: '/images/10159-1.jpg', alt: `U.S. Post Office` },
      { url: '/images/10159-2.jpg', alt: `U.S. Post Office` },
      { url: '/images/10159-3.jpg', alt: `U.S. Post Office` },
    ],
    audioUrl: '/audio/10159.mp3',
    transcript: `U.S. Post Office: 301 E. Main St.

From the Baca House looking south is located one of the town’s three buildings listed in the National Registry of Historic Sites, the U.S. Post Office. Built in 1910 in pure new-classic style, the building features Ionic columns topped by a Greek pediment. It is built on the site of a gargoyle of a building, a three-story pile of stone with small windows and many turrets and towers. Originally a private home, it was for several years The Trinidad Club, an exclusive, quiet, and formal men’s club back when the little city offered many amenities normally found only in metropolitan areas.

Where there is now the post office parking lot was a handsome, mansard-roofed three-story home. Those two houses, plus the Chappell home on the corner (now a funeral home), and the two large homes in the museum complex, gave this block the moniker of Millionaire’s Row in the late 1800s. Probably none of the families was of true millionaire status, an enormous fortune in those days, but there is no doubt they were all quite wealthy and enjoyed a gracious life here.

And it was right smack dab in the middle of this bastion of reactionary wealth that another dramatic episode took place during the 1913-14 miners’ strike. The nationally famous (or infamous) Mother Jones was in town. A union organizer, a fiery public speaker, and a great morale-booster for the union, the little white-haired spitfire had been in and out of Trinidad and the surrounding coal camps several times since the strike began, inspiring the miners and becoming loved by their women. In January 1914, she arrived again, defying an order from General John Chase, commander of the Colorado Militia that was trying to maintain order. Warned she was coming, General Chase met her at the railroad station and promptly incarcerated her “for her own protection” in a guarded room at Mt. San Rafael Hospital, some 12 blocks east of here. The miners were infuriated.

From the far-flung coal camps and the tent colonies where the strikers huddled, they came to town on a cold January 22nd, 1914. More than a thousand of them gathered at Castle Hall (today’s Eagle Hall about a block west of the Commercial Street bridge). The general had warned the miners not to approach the hospital or there would be violence, so it was decided only the women and children would march in protest. About 400 of them straggled in ragged lines east to Commercial, across the river and up to Main, intimidated and confused at first, but becoming increasingly bold. Shouting their hatred up at the second floor of the Columbian, they turned east on Main, headed for the hospital.

In the intersection of Main and Walnut at the end of this block, the cavalry waited in a solid phalanx. General Chase rode back and forth on his nervous horse. The women stopped and milled about, shouting, surging forward, pushed by those behind. The general’s horse slipped (or jumped from a jabbing umbrella) and fell. The general lost his seat, his dignity, and his temper in one fell swoop. Whether or not he cried “Charge!” was never determined in later hearings, but charge the cavalry did, sabers drawn and bayonets bared. The women fell back, throwing rocks, curses, and screams at the mounted men. In the melee, arms were slashed, feet crushed under hooves, and one ear was severed. The women finally scattered and Mother Jones remained in the hospital until union lawyers gained her release.`,
    coordinates: { lat: 37.1696665, lng: -104.5030405 },
  },
  {
    id: 24,
    name: `The Baca House`,
    description: `300 - 304 E. Main St.`,
    era: `Built 1870`,
    style: `Residence · Museum`,
    duration: `2 min listen`,
    teaser: `On the southeast corner of Main and Chestnut Streets is the oldest standing residence in the National Historic…`,
    images: [
      { url: '/images/10160-1.jpg', alt: `The Baca House` },
    ],
    audioUrl: '/audio/10160.mp3',
    transcript: `The Baca House: 300 - 304 E. Main St.

On the southeast corner of Main and Chestnut Streets is the oldest standing residence in the National Historic District, the Baca House, which is now part of the Colorado Historical Society’s museum complex that encompasses the entire block. The unusual two-story adobe was built in 1870 by John S. Hough, a mid-westerner who somehow stumbled on the style later known as Territorial. A merchant and mill owner, Hough moved away about a year after building the house and sold it to Felipe Baca, one of the town’s original settlers, whose family occupied the house into the 1930s. The museum guides give a much better, more detailed description of the house and of the Bloom Mansion on the far end of the block than we can do here. The museum entrance is in the street-level building in the middle of the block on Chestnut Street.`,
    coordinates: { lat: 37.1693027, lng: -104.5028357 },
  },
  {
    id: 25,
    name: `The Bloom Mansion`,
    description: `312 E. Main St.`,
    era: undefined,
    style: `Residence · Museum`,
    duration: `2 min listen`,
    teaser: `Peer over the high retaining wall to admire the lovely exterior of the Bloom Mansion.`,
    images: [
      { url: '/images/10161-1.jpg', alt: `The Bloom Mansion` },
    ],
    audioUrl: '/audio/10161.mp3',
    transcript: `The Bloom Mansion: 312 E. Main St.

Peer over the high retaining wall to admire the lovely exterior of the Bloom Mansion. Experts say it is Colorado’s finest remaining example of Second Empire architecture. The Bloom family continued to occupy it until well into the 1900s, but then it saw some bad days until it was saved and turned into a museum. The interior is furnished with many of the Bloom’s original pieces that were tracked down or donated by heirs. Painstaking research has led to exact duplication of wallpapers, drapes, and other details. The Victorians were gadget-mad and the house has many ingenious examples, which the guides point out and explain. Don’t miss this.`,
    coordinates: { lat: 37.1694426, lng: -104.5026992 },
  },
  {
    id: 26,
    name: `Chappell House`,
    description: `335 E. Main St.`,
    era: `Built 1883`,
    style: `Residence · Museum`,
    duration: `2 min listen`,
    teaser: `The funeral home at the east end of the block was the home of Delos Chappell, the man who built Trinidad’s first…`,
    images: [
      { url: '/images/10162-1.jpg', alt: `Chappell House` },
    ],
    audioUrl: '/audio/10162.mp3',
    transcript: `Chappell House: 335 E. Main St.

The funeral home at the east end of the block was the home of Delos Chappell, the man who built Trinidad’s first water system but put a private water system in this house. He also put in fine inlaid woodwork, stained glass, chandeliers, and an ornate staircase. The staff welcomes visitors if there is not a service in progress. The house was built in 1883, one year after the Bloom Mansion across the street. The story goes that Chappell was such a brilliant engineer that architects and designers in Denver gave him this home to keep him here to avoid competing with him, especially with the construction of the state capitol building coming up. However, Chappell later moved to Denver and became a leading citizen.

Early photographs show the house level with, or even slightly below, Main Street. Now, the house stands about 3 feet above the street. Main has been lowered or raised about 4 or 5 feet in various places. As said before, it was a heckuva place to build a town.`,
    coordinates: { lat: 37.1699218, lng: -104.5024717 },
  },
  {
    id: 27,
    name: `Rino's Restaurant`,
    description: `400 E. Main St.`,
    era: `c. 1922`,
    style: `Trade · Social`,
    duration: `2 min listen`,
    teaser: `Rino’s Restaurant on the southwest corner of the intersection began life as the First Christian Church.`,
    images: [
      { url: '/images/10163-1.jpg', alt: `Rino's Restaurant` },
      { url: '/images/10163-2.jpg', alt: `Rino's Restaurant` },
    ],
    audioUrl: '/audio/10163.mp3',
    transcript: `Rino's Restaurant: 400 E. Main St.

Rino’s Restaurant on the southwest corner of the intersection began life as the First Christian Church. Built just after the turn of the 20th century by a parson who was also a stonemason and designer, it was abandoned by the church in 1922 for larger quarters up the street. At first, it was used by another congregation, but then it became a warehouse until about 20 years or so ago, when it was converted into a restaurant and bar. An interesting building in eclectic style, it formerly had a stained glass window in the large arched opening on the west. It still retains the lovely scrollwork in the gable. As you walk on up Walnut, you get increasingly better views of the Bloom Mansion, its lovely grounds, and the Victorian cutting garden.`,
    coordinates: { lat: 37.16966190000001, lng: -104.5019257 },
  },
  {
    id: 28,
    name: `Memorial Square/Fort Wootton`,
    description: `204 S. Chestnut St.`,
    era: `Built 1904`,
    style: `Civic · Public`,
    duration: `2 min listen`,
    teaser: `On the southwest corner of Walnut and 1st streets is a huge stone building that stretches for the entire block, now…`,
    images: [
      { url: '/images/10164-1.jpg', alt: `Memorial Square/Fort Wootton` },
      { url: '/images/10164-2.jpg', alt: `Memorial Square/Fort Wootton` },
    ],
    audioUrl: '/audio/10164.mp3',
    transcript: `Memorial Square/Fort Wootton: 204 S. Chestnut St.

On the southwest corner of Walnut and 1st streets is a huge stone building that stretches for the entire block, now called Memorial Square but initially known as Fort Wootton. Although it was meant to look like a Western frontier fort, it was actually built in the 1930s as a make-work project for the WPA during the Great Depression. The large building on the corner, seldom used today, was formerly the scene of town meetings, bingo games and come-one, come-all dances. The remainder of the structure is actually a series of small buildings around a central courtyard, each building designated as a meeting place for one of the various veteran’s organizations. After many years of being the location for the Las Animas County Department of Social Services, the “Fort” once again is the home of local Veteran’s Organizations.

As you walk on up Walnut, you will pass on your left the larger meeting house to which the First Christian Church moved and, on your right, several still-occupied 1880s Victorian homes with their asymmetric tack-ons and gables.

Turn West (right) at 2nd Street for a good view across the street of a carefully refurbished mansion. Built about 1904-07 by two (of five in town) Tarabino brothers, both of whom were married and had families, the home had a common entryway that led to totally separate apartments, which accounts for the unusual design with the matching gables. The brothers owned and operated The Famous Department Store, one of downtown’s leading merchandisers. The steep-roofed frame house on the southeast corner of Second and Chestnut is possibly the oldest in this neighborhood. Panoramic photos of the city in the 1880s show it standing out prominently and pretty much alone.`,
    coordinates: { lat: 37.1686138, lng: -104.5024967 },
  },
  {
    id: 29,
    name: `Van Vleet House`,
    description: `212 E. 2nd St.`,
    era: `c. 1904`,
    style: `Residence · Museum`,
    duration: `2 min listen`,
    teaser: `This large home, now on the National Register of Historic Places, was one of the finest in the city and helped give…`,
    images: [
      { url: '/images/10165-1.jpg', alt: `Van Vleet House` },
    ],
    audioUrl: '/audio/10165.mp3',
    transcript: `Van Vleet House: 212 E. 2nd St.

This large home, now on the National Register of Historic Places, was one of the finest in the city and helped give this area its nickname of Aristocracy Hill. Fourteen months under construction (1904-1905), it was built by Charles H. Nichols but later bought by the Van Vleet family that owned, among other things, the Trinidad Bean and Elevator Company that operated throughout the region. They were so wealthy they were fearful, even in those relatively safe and sane days, and kept armed guards at each entrance to the house and another roaming the grounds. Children had to have invitations and appointment times to come play with their son and daughter.

The home, with magnificent woodwork throughout, formerly had a one-lane bowling alley in the basement and a third-floor billiard room.

Walk on up Chestnut to 3rd Street and turn right. The house on the northwest corner belonged to one of the Jaffa Brothers, who built the Opera House. Many prominent Jewish families of Trinidad lived in this area. The house on the other end of the block at 3rd and Maple Street was the home of the Hammerslough family, other prominent Jews who helped to build Trinidad.`,
    coordinates: { lat: 37.1673864, lng: -104.5024262 },
  },
  {
    id: 30,
    name: `Temple Aaron`,
    description: `407 S. Maple`,
    era: `Built 1889`,
    style: `Sacred · Landmark`,
    duration: `2 min listen`,
    teaser: `On the southwest corner of this intersection is Temple Aaron, the Jewish synagogue built in 1889.`,
    images: [
      { url: '/images/10166-1.jpg', alt: `Temple Aaron` },
      { url: '/images/10166-2.jpg', alt: `Temple Aaron` },
    ],
    audioUrl: '/audio/10166.mp3',
    transcript: `Temple Aaron: 407 S. Maple

On the southwest corner of this intersection is Temple Aaron, the Jewish synagogue built in 1889. Designed by Isaac Hamilton Rapp, the famous Trinidad architect who originated the Santa Fe style of architecture and created many of this city’s best public buildings, the temple is a harmonious mix of architectural details with Moslem minarets, a Germanic tower, and both Romanesque and Gothic stained-glass windows. The interior (opened only for holiday and special occasions) features an ornate hand-carved pulpit and a pipe organ brought west by wagon train (so they say).

It is the oldest continuously utilized synagogue in Colorado and because the Jewish population is now so small, has become a community project. During Jewish Holy Days, when a rabbi comes from out of town, people of many faiths sing in the choir, play the organ, and perform other services.`,
    coordinates: { lat: 37.1663348, lng: -104.5029722 },
  },
  {
    id: 31,
    name: `Las Animas County Courthouse`,
    description: `200 E. 1st St.`,
    era: `Est. 1950`,
    style: `Civic · Public`,
    duration: `2 min listen`,
    teaser: `Walk down (north) on Maple Street, enjoying one of the best close-up vistas of downtown.`,
    images: [
      { url: '/images/10167-1.jpg', alt: `Las Animas County Courthouse` },
      { url: '/images/10167-2.jpg', alt: `Las Animas County Courthouse` },
    ],
    audioUrl: '/audio/10167.mp3',
    transcript: `Las Animas County Courthouse: 200 E. 1st St.

Walk down (north) on Maple Street, enjoying one of the best close-up vistas of downtown. The upcoming County Courthouse was designed by the same architect, Isaac Hamilton Rapp, who, as noted, accidentally originated the Santa Fe Style of architecture. It seems he had been contracted by Colorado Fuel and Iron to design a storehouse in their company town of Morley and was told “something sort of Southwestern” might be nice. He used a flat roof, stucco to simulate adobe, ornate Spanish trim around doors and windows, and the protruding vigas of Indian pueblos. Santa Fe fathers, who had been searching for a distinctive architecture for their city, spied it and exclaimed, “That’s it!” They contacted ‘Rapp to design some of their major buildings and the rest, as they say, is history. Although he was busy in Santa Fe for many years, he always maintained his house in Trinidad and retired here.

Many people, including Rapp himself, consider the Las Animas County Courthouse his masterpiece. The spacing, the balance, the architectural details are so harmonious, they create a stateliness without any pretension and make the large building that could be austere very approachable, even friendly. The interior is equally handsome and welcoming. Enter through the West entrance from Maple Street. Go down the hall to the left and around the corner. At the front entrance, turn to notice the ornate, gilded metal balustrade on the stairway. Circling above the entrance is Mario Benedetti’s mural depicting county history from conquistadors to coal miners. Outside, on the corner of First and Maple, is a replica of the Statue of Liberty paid for by the pennies of local troops of the Boy Scouts of America and other school children, and erected in 1950.`,
    coordinates: { lat: 37.1682264, lng: -104.503086 },
  },
  {
    id: 32,
    name: `Elks Lodge`,
    description: `120 S. Maple St.`,
    era: `Built 1890`,
    style: `Fraternal · Social`,
    duration: `2 min listen`,
    teaser: `On the northeast corner of the intersection is Elks Lodge, dedicated in 1926.`,
    images: [
      { url: '/images/10168-1.jpg', alt: `Elks Lodge` },
    ],
    audioUrl: '/audio/10168.mp3',
    transcript: `Elks Lodge: 120 S. Maple St.

On the northeast corner of the intersection is Elks Lodge, dedicated in 1926. Of Spanish Mission architecture that reflects that Carlisle Building down the block, it has some interesting highlights.

On this steep block between First and Main occurred in 1905 an interesting little vignette that illustrates the change in tactics of law enforcement agencies. After a snowfall, the kids discovered this steep slope was ideal sledding. This bothered no one, since traffic couldn’t make it up the hill anyway. But the children couldn’t stop their sleds and kept shooting out in front of oncoming Main Street traffic, which was all horse-drawn, but nevertheless dangerous. Instead of ordering the kids off and then patrolling all day to keep them from returning, one clever policeman solved the problem neatly. He simply salted the street, melting the snow, and that took care of that.

Turn left on Main Street. The first major building on the north side was built in 1890. The engaged columns and ornate cornice that appear to be stonework are really pressed tin. The Victorians did that often.

The next building, constructed for a large department store that has since closed, was imaginatively turned into a mini-mall and now houses various galleries and creative shops, much to the delight of visiting shoppers and residents alike.`,
    coordinates: { lat: 37.1687089, lng: -104.5036548 },
  },
  {
    id: 33,
    name: `Danielson Building`,
    description: `135 E. Main St.`,
    era: `Built 1885`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `The following building, known as the Danielson Building, was built in 1885 with some nice Romanesque designs and…`,
    images: [
      { url: '/images/10169-1.jpg', alt: `Danielson Building` },
      { url: '/images/10169-2.jpg', alt: `Danielson Building` },
      { url: '/images/10169-3.jpg', alt: `Danielson Building` },
    ],
    audioUrl: '/audio/10169.mp3',
    transcript: `Danielson Building: 135 E. Main St.

The following building, known as the Danielson Building, was built in 1885 with some nice Romanesque designs and unusual cornice of brick. Recently renovated, the first-floor façade is no longer historically accurate but is of the era and tastefully done.

If you have been noticing the dates of the buildings, you will have realized by now that Trinidad did not, like most river towns, start by the river and build uphill. That’s because Trinidad is not a river town, despite having a river flow through it. Rather, Trinidad is a Santa Fe Trail town and began developing where the two major routes of the trail came together. It took almost 40 years to build down to the river with permanent buildings.`,
    coordinates: { lat: 37.1690893, lng: -104.5050426 },
  },
  {
    id: 34,
    name: `Bell Block`,
    description: `126 - 134 W. Main St.`,
    era: `c. 1883`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `Beyond the alley is the Bell Block, built in sections at different times but claiming 1883 because that was when the…`,
    images: [
      { url: '/images/10171-1.jpg', alt: `Bell Block` },
    ],
    audioUrl: '/audio/10171.mp3',
    transcript: `Bell Block: 126 - 134 W. Main St.

Beyond the alley is the Bell Block, built in sections at different times but claiming 1883 because that was when the center building was completed and is still marked with that year. You will have to cross the street to appreciate all the fine stonework on the façade, especially in the intricate cornice. (There’s a walkway at the end of the block). Right now, however, walk into the atrium to see how imaginatively the buildings were redeveloped after they were gutted by fire in the 1970s. Read the signs about the building’s history, some of which is questionable, especially the statement that Main Street was six feet lower than now at the time of the building’s construction. That guess was probably based on the fact that the lower level of the building extends out under the sidewalk. It was common practice in Victorian times to have steps down from the sidewalk to lower-level shops. This was done in many places in Trinidad, as old photographs show. Almost all of them have now been covered by new sidewalks.

Note, in particular, the unusual circular radiator at the entrance of the atrium. It originally stood in a company-owned store in the coal camp of Tercio about 35 miles west of here. It was donated to the refurbished building by the CF & I Steel Corporation.`,
    coordinates: { lat: 37.1683092, lng: -104.505874 },
  },
  {
    id: 35,
    name: `The Famous Building`,
    description: `131 W. Main St.`,
    era: `Est. 1889`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `The major building across the street was constructed in 1889 with bay windows on either side of the arched second…`,
    images: [
      { url: '/images/10172-1.jpg', alt: `The Famous Building` },
      { url: '/images/10172-2.jpg', alt: `The Famous Building` },
    ],
    audioUrl: '/audio/10172.mp3',
    transcript: `The Famous Building: 131 W. Main St.

The major building across the street was constructed in 1889 with bay windows on either side of the arched second story windows that remain. It was, for many years, the home of The Famous Department Store, a local favorite, and is still called the Famous Building by old timers, although J.C. Penney occupied it for decades and it is now the home of the local performing arts theatre, Main St. Live!`,
    coordinates: { lat: 37.168451, lng: -104.5064576 },
  },
  {
    id: 36,
    name: `The Palace`,
    description: `137 W. Main St.`,
    era: `Built 1911`,
    style: `Historic · Downtown`,
    duration: `3 min listen`,
    teaser: `On the corner is one of the few buildings in Trinidad that was built to be a bar and has always been one, except…`,
    images: [
      { url: '/images/10173-1.jpg', alt: `The Palace` },
    ],
    audioUrl: '/audio/10173.mp3',
    transcript: `The Palace: 137 W. Main St.

On the corner is one of the few buildings in Trinidad that was built to be a bar and has always been one, except during Prohibition when it became a confectionery. Built in 1911 and called “The Palace”, it lived up to its name with a very handsome saloon on the first floor and a luxurious restaurant and elegant gambling salon on the second. Where now there is a little aluminum-framed window on the second floor was a handsome curved bay window with stained glass and a gingerbread frame, all of which was removed in the post-World War II frenzy for modernization. However, the original backbar, hand-carved and imported from Germany, is still in place.

Local legend has it that Carry Nation, the hatchet-wielding prohibition activist, once visited this bar but left quietly, as was requested in a very firm manner. This doesn’t quite jive, since Mrs. Nation was in Trinidad in 1906, five years before the building was built (though of course she could have returned). However, her 1906 stay was chronicled in the local newspapers. They reported that when she arrived at the railway station, a porter asked to which hotel her baggage should be delivered. “Some place clean and far from the taint of liquor,” the stalwart (almost 6-foot-tall) woman replied. The porter dropped her bags and said, “Ma’am I think you got off at the wrong station. This is Trinidad!” At the time, there were over 100 bars in the county, some 40 of them along Main and Commercial Streets, where all the hotels were.

If she didn’t visit The Palace, there is no doubt she entered another West Main Street bar owned by a young Italian named Charles Aiello. He ordered her out, she refused, and the upshot was she swore out a warrant for his arrest, charging that “he used unprintable language and struck me in the face.” He swore out a warrant saying she caused a disturbance in his place of business. They each got a $25 fine. She soon left town, after writing that Trinidad was “the devil’s carnival ground…the recruiting place for hell.” Mr. Aiello’s family became prominent businessmen and bankers.`,
    coordinates: { lat: 37.1683755, lng: -104.5065783 },
  },
  {
    id: 37,
    name: `Franch Block`,
    description: `200 - 210 W. Main St.`,
    era: `Built 1887`,
    style: `Historic · Downtown`,
    duration: `5 min listen`,
    teaser: `Cross over Main to View the rather severe but handsome façade of the Franch Block built in 1887.`,
    images: [
      { url: '/images/10174-1.jpg', alt: `Franch Block` },
      { url: '/images/10174-2.jpg', alt: `Franch Block` },
    ],
    audioUrl: '/audio/10174.mp3',
    transcript: `Franch Block: 200 - 210 W. Main St.

Cross over Main to View the rather severe but handsome façade of the Franch Block built in 1887. It is the second building with incised designs that seem more Southwest Native American than Victorian.

The Franch Block and the Aiello/Toller Buildings make up the three buildings in this block of downtown which contribute to El Corazon de Trinidad National Historic District. 1882 marks the first construction on any of the buildings in this group, although they did not enter their period of historical significance until 1887 with the addition of sandstone cladding that remains prominent today. The purchase of the Stevens block building (the central structure) by Giacomo Toller brought significant changes to the building, to reflect the increasing influence of automobiles at the time. These changes are also a good representation of Art Deco style architecture.

The magnificent Coal Miners’ Monument seen across the street, honoring local miners, is a project of Trinidad’s Hispanic Chamber of Commerce. The life-sized figures are portraits of three actual miners created by sculptor Ben Johnson, instructor at Trinidad State College. Names on the base are men who worked the local mines. A statue of murdered Greek labor hero Louis Tikas was erected on site in 2018 by the United Mine Workers of America. Tikas, born Ilias Athanasios Spantidakis, in Crete in 1886, became a symbol of the struggle for labor rights in the United States after he was murdered by the Colorado National Guard on April 20, 1914 as the leader of the Ludlow miners who went on strike against inhuman working conditions in the Rockefeller’s CF&I mines.

At the far end of the block, on the north side, was the location of one of the very early general stores that catered to Santa Fe Trail traffic, owned by Maurice Wise, the Jewish merchant who donated part of the land for the Catholic Church and parochial school. In the first years of the 20th century, this building housed the Trinidad Electric Transmission Company. And it was here, in 1911, during a week-long show that had Trinidad agog, that local housewives first saw such marvels as electric washing and sewing machines, an iron that didn’t have to be reheated on the coal stove, and even an electric cooking range! All of these were marvels foretelling the end of the coal era that supported the town.

On the corner across the street is a handsome, rather utilitarian building put up by John Aiello, brother of the man who had the ruckus with Carry Nation. That was the site of the Colorado Hotel in 1868, when most of the 60-odd Anglos in town barricaded themselves against about 300 Hispanics swarming outside, angrily demanding the surrender of a few of the Anglos at whom their fury was aimed. Now known as the Trinidad War, it was really a race riot. And, though men of good will on both sides tried to talk reason, peace didn’t come until the U.S. Cavalry roared into town and camped for several weeks. Supposedly started by a wrestling match between an Anglo and a Hispanic that ended with the death of the Hispanic, it actually was a result of friction built up over the years by a clash of cultures.

Even in small ways, such as casual pastimes, the cultures rubbed against each other. For instance, the Anglos were mostly repulsed by the Hispanics’ great sport often practiced along about here on Main Street. It was called “Racing for the Rooster”. A chicken was buried up to its neck in the sand of the street and young caballeros, one by one, galloped past, leaning from the saddle in an attempt to pick up the rooster by its head. Of course, often only the head came. Beech Street, which formerly crossed Main, now deadends, its northern continuation converted into a one-way parking lot access.`,
    coordinates: { lat: 37.1679538, lng: -104.5066012 },
  },
  {
    id: 38,
    name: `Las Animas Building`,
    description: `301 W. Main St.`,
    era: `Built 1883`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `Just west is the Las Animas Building, the first building in town authentically restored by a private individual.`,
    images: [
      { url: '/images/10175-1.jpg', alt: `Las Animas Building` },
    ],
    audioUrl: '/audio/10175.mp3',
    transcript: `Las Animas Building: 301 W. Main St.

Just west is the Las Animas Building, the first building in town authentically restored by a private individual. The two-story building trimmed in local sandstone was built in 1883 by Elbridge Sopris, who lived on the second floor for many years, and the building is often called the Sopris Block, despite its proper name being carved in a handsome cornice. The lower floor (and the upper, after Sopris died) housed many businesses over the years and was once Trinidad’s post office. Before this building was put up, this site was occupied by the famous Exchange Saloon where Trinidad’s first killed-on duty sheriff was shot by a Texas cowboy (for that complete story, listen to the account in the East Main Street section.)

As you walk past the shops in this block, notice how various architects utilized the Chicago-style iron columns to lend harmony to the block. Early Trinidad architects often were conscious not only of the building they were designing but also of their compatibility with the neighborhood.`,
    coordinates: { lat: 37.1678439, lng: -104.5073558 },
  },
  {
    id: 39,
    name: `West Block`,
    description: `331 - 335 W. Main St.`,
    era: `Built 1889`,
    style: `Historic · Downtown`,
    duration: `2 min listen`,
    teaser: `Look back across the street at the West Block, or West Hotel, built in 1889 by Edward West who made his money…`,
    images: [
      { url: '/images/10176-1.jpg', alt: `West Block` },
      { url: '/images/10176-2.jpg', alt: `West Block` },
    ],
    audioUrl: '/audio/10176.mp3',
    transcript: `West Block: 331 - 335 W. Main St.

Look back across the street at the West Block, or West Hotel, built in 1889 by Edward West who made his money running sheep on government open range. Typically Victorian with its mixture of styles, it is still a handsome and interesting building. The building is still rococo but much less so since the top of the façade was modernized. Formerly, three ornate false gables decorated the front and a minaret-like tower rose on the corner.`,
    coordinates: { lat: 37.1677955, lng: -104.50749 },
  },
  {
    id: 40,
    name: `Fox Theatre`,
    description: `423 W. Main St.`,
    era: `Est. 1908`,
    style: `Theatre · Grand`,
    duration: `4 min listen`,
    teaser: `From here is the best vantage point for admiring the huge bulk of the Fox West Theatre, across the street to the west.`,
    images: [
      { url: '/images/10177-1.jpg', alt: `Fox Theatre` },
      { url: '/images/10177-2.jpg', alt: `Fox Theatre` },
      { url: '/images/10177-3.jpg', alt: `Fox Theatre` },
      { url: '/images/10177-4.jpg', alt: `Fox Theatre` },
    ],
    audioUrl: '/audio/10177.mp3',
    transcript: `Fox Theatre: 423 W. Main St.

From here is the best vantage point for admiring the huge bulk of the Fox West Theatre, across the street to the west. Built by the same Edward West of the vast sheep flocks who built the West Block we just spoke of. Opened in 1908 as a venue for traveling Vaudeville acts, the Fox (named the West Theatre until the 1940s) was designed by the Rapp Brothers firm of Trinidad. It was one of the grandest theatres in the state --- indeed, in the West --- and many of its fine facilities and ornate details remain in the interior, though the street level façade has been extensively changed. Originally, twin Corinthian columns stood on either side of the entrance. They have disappeared but the handsome balustrade still decorates the top of the second story. The high-rising third (really, the fourth) floor at the rear of the building houses the intricate machinery for special effects on the stage and stores the many backdrops that were available for stage scenery.

The main auditorium seems limitlessly high with ornate, gilded carving on the front of the balconies and private loges along the side. It boasts a seventy-one-foot stage that has hosted a wide array of history’s famous performers, including John Philip Sousa, Mother Jones, Roy Rogers, Sitting Bull, Rube Welch, violinist Rubinoff and many others. It seats 650 people and has received an award from the Colorado Historical Theatre Association for being the only remaining theatre in Colorado with a double-tiered balcony. In the basement, was a large ornate ballroom where orchestras played several times a week. The theatre was fully converted into a motion picture theater in 1929 and was operated as such until its closure in 2012.

In 2018, the historic building was purchased by the City of Trinidad and with the support of History Colorado and in partnership with Urban Neighborhoods, Inc, preservation of this architectural and cultural gem has begun.

You now stand in Trinidad’s once-infamous West Main street, for years the area of the town’s liveliest bars, brawniest gaming houses and thriving red light district. If you had walked here in the early 1900s, (you ladies wouldn’t), you would have been accosted about every three steps by flouncing skirts (or their pimps) and you would have kept a sharp lookout for drunks and pickpockets. Walk on down. It’s safe now.

About every four years from the 1880s until well into the 1900s, a clean-up of West Main was announced, either by the sheriff or the city police. A few raids would be made but, after elections, it was business as usual.

Return to Animas Street and turn left, to the north. The building that is now an annex of City Hall looks quite new and modern because of the unusual shape of its front windows and the glass entrance. However, it pre-dates City Hall next to it and must have been built in the 1880s, for it was used by Trinidad’s first mortuary (Sipes, established in 1879) to house its horse teams, carriages, and hearse. The building has had many uses since then and has belonged to the city for years.`,
    coordinates: { lat: 37.16747700000001, lng: -104.5087738 },
  },
  {
    id: 41,
    name: `City Hall`,
    description: `135 N. Animas St.`,
    era: `Est. 1909`,
    style: `Civic · Public`,
    duration: `2 min listen`,
    teaser: `Next is City Hall, finally constructed in 1909, after years of argument over the location, although the foundation…`,
    images: [
      { url: '/images/10178-1.jpg', alt: `City Hall` },
    ],
    audioUrl: '/audio/10178.mp3',
    transcript: `City Hall: 135 N. Animas St.

Next is City Hall, finally constructed in 1909, after years of argument over the location, although the foundation was already constructed and serving meanwhile as a great playground for boys pretending it was a fort or the Roman Colosseum. Not counting the foundation, it cost about $12,800, but that bought a lot in those days.

With a flourish of Victorian eclecticism, the architect designed front corner towers of late Italian Renaissance design, placed a French Renaissance balustrade atop the building and fronted the edifice with Greek Ionic capitals above polished black granite columns that stand on Italian Renaissance bases. Somehow, the design holds together.`,
    coordinates: { lat: 37.1679688, lng: -104.5087738 },
  },
  {
    id: 42,
    name: `Carnegie Public Library`,
    description: `202 N. Animas St.`,
    era: `Built 1904`,
    style: `Civic · Public`,
    duration: `2 min listen`,
    teaser: `Just across the street is Carnegie Public Library, built in 1904.`,
    images: [
      { url: '/images/10179-1.jpg', alt: `Carnegie Public Library` },
    ],
    audioUrl: '/audio/10179.mp3',
    transcript: `Carnegie Public Library: 202 N. Animas St.

Just across the street is Carnegie Public Library, built in 1904. There has been virtually no change on the exterior of the building, except for the installation of a less drafty front door. So, the classic façade remains pristine despite a discreetly designed addition on the north side. Inside, the original paneling and many of the first bookshelves are still intact. The library itself, however, is not fustian. It has a surprisingly up-to-date and varied collection of over 20,000 volumes, computerized book search equipment and Internet-connected computers available. Downstairs is a heavily used, well-designed children’s section. In a special room, the library maintains the records of the Trinidad Historical Society, the Hispanic Genealogical Society, films of Trinidad newspapers back to the 1880s as well as City Directories from the 1890s, and a vast collection of local and regional history books.

A walk of a block or two east on Church Street (beside the library) takes you back to the city parking lot. If you did not interrupt your walk to visit The AR Mitchell Museum on East Main, please do so now. Don’t miss out on the opportunity to see one of the region’s top western art museums!`,
    coordinates: { lat: 37.1682823, lng: -104.5083408 },
  },
]
