const listingId = localStorage.getItem(`listingId`)
const listingImage = document.getElementById(`listing-image`)
const listingTitle = document.getElementById(`listing-title`)
const listingPrice = document.getElementById(`listing-price`)
const listingLocation = document.getElementById(`listing-location`)
const listingDescription = document.getElementById(`listing-description`)
const deleteButton = document.getElementById(`delete-listing`)
const productInformationWrapper = document.getElementById(`product-information-wrapper`)
const burgerMenu = document.getElementById(`burger-menu`)
const mobileMenu = document.getElementById(`mobile-menu`)

burgerMenu.addEventListener(`click`, () => {
    mobileMenu.classList.toggle(`active-menu`)
})

const fetchListing = async () => {
    const response = await fetch(`https://65c5f748e5b94dfca2e0aa0a.mockapi.io/listing/${listingId}`)

    const listing = await response.json()

    listingImage.src = listing.image
    listingTitle.innerHTML = listing.name
    listingPrice.innerHTML = `Price of the product: ${listing.price}`
    listingDescription.innerHTML = `Product's description: ${listing.description}`
    listingLocation.innerHTML = `Vendor's location: ${listing.location}`

    deleteButton.addEventListener(`click`, async () => {
        const response = await fetch(`https://65c5f748e5b94dfca2e0aa0a.mockapi.io/listing/${listingId}`,
        {
            method: "DELETE",
        }
        );

        const listing = await response.json()

        const deletionMessage = document.createElement(`p`)
        deletionMessage.innerHTML = `Listing was deleted`
        deletionMessage.style.color = `red`
        deletionMessage.style.fontFamily = `Poppins', sans-serif`
        deletionMessage.style.fontWeight = `300`
        productInformationWrapper.append(deletionMessage)

        setTimeout(() => {
            const redirectionMessage = document.createElement(`p`)
            redirectionMessage.innerHTML = `You will now be redirected`
            redirectionMessage.style.color = `black`
            redirectionMessage.style.fontFamily = `Poppins', sans-serif`
            redirectionMessage.style.fontWeight = `300`
            deletionMessage.append(redirectionMessage)
        }, 1500);

        setTimeout(() => {
            window.location.href = `../index.html`
        }, 5000);
    })
}

fetchListing()