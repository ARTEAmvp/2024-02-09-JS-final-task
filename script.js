const cardSectionWrapper = document.getElementById(`main-wrapper`)
const burgerMenu = document.getElementById(`burger-menu`)
const mobileMenu = document.getElementById(`mobile-menu`)

burgerMenu.addEventListener(`click`, () => {
    mobileMenu.classList.toggle(`active-menu`)
})

const fetchListings = async () => {
    const response = await fetch(`https://65c5f748e5b94dfca2e0aa0a.mockapi.io/listing`)

    const listings = await response.json()

    listings.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceA - priceB;
      });

    listings.forEach((listing) => {
        const cardWrapper = document.createElement(`a`)
        const cardImage = document.createElement(`img`)
        const cardPrice = document.createElement(`p`)
        const cardTitle = document.createElement(`p`)

        cardWrapper.append(cardImage)
        cardWrapper.append(cardPrice)
        cardWrapper.append(cardTitle)
        cardSectionWrapper.append(cardWrapper)

        cardPrice.innerHTML = listing.price
        cardPrice.style.color = `green`

        cardTitle.innerHTML = listing.name
        cardTitle.style.color = `#001F54`

        cardImage.src = listing.image
        cardImage.style.height = `450px`
        cardImage.style.width = `280px`
        cardImage.style.objectFit = `contain`

        cardWrapper.style.padding = `15px`
        cardWrapper.style.display = `flex`
        cardWrapper.style.flexDirection = `column`
        cardWrapper.style.textAlign = `center`
        cardWrapper.style.alignItems = `center`
        cardWrapper.style.cursor = `pointer`
        cardWrapper.style.textDecoration = `none`
        cardWrapper.style.color = `black`
        cardWrapper.style.backgroundColor = `white`
        cardWrapper.href = `./listing/listing.html`
        cardWrapper.classList.add(`card-text`)
        cardWrapper.addEventListener('mouseover', function() {
            cardWrapper.classList.add('hovered');
        })
        cardWrapper.addEventListener('mouseout', function() {
            cardWrapper.classList.remove('hovered');
        })

        let listingPrice = parseFloat(listing.price.replace(`$`, ``))

        if (listingPrice < 15) {
            cardWrapper.setAttribute(`class`, `cheap-listing`)
        } else if (listingPrice > 15 && listingPrice <= 40) {
            cardWrapper.setAttribute(`class`, `medium-price-listing`)
        } else {
            cardWrapper.setAttribute(`class`, `expensive-listing`)
        }

        cardWrapper.addEventListener(`click`, () => {
            localStorage.setItem(`listingId`, listing.id)
        })
    })
}

fetchListings()