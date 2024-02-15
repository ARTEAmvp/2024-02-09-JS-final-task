const formTitle = document.getElementById(`title`);
const formPrice = document.getElementById(`price`);
const informationalMessage = document.getElementById(`informational-message`)
const formImage = document.getElementById(`image`);
const formDescription = document.getElementById(`description`);
const formLocation = document.getElementById(`location`);
const formSubmitButton = document.getElementById(`submit`);
const formWrapper = document.getElementById(`form`);
const createListingWrapper = document.getElementById(`create-listing-wrapper`)
const burgerMenu = document.getElementById(`burger-menu`)
const mobileMenu = document.getElementById(`mobile-menu`)

burgerMenu.addEventListener(`click`, () => {
    mobileMenu.classList.toggle(`active-menu`)
})

formPrice.addEventListener(`focus`, () => {
    informationalMessage.style.display = `block`
})

formPrice.addEventListener(`blur`, () => {
    informationalMessage.style.display = `none`
})

formSubmitButton.addEventListener(`click`, async () => {

    const existingErrorMessages = formWrapper.querySelectorAll('.error-message');
    existingErrorMessages.forEach(errorMessage => errorMessage.remove());

    const titleValue = formTitle.value.trim();
    const priceValue = formPrice.value.trim();
    const descriptionValue = formDescription.value.trim();
    const locationValue = formLocation.value.trim();

    const titleRegex = /^[a-zA-Z0-9\s]{1,100}$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const descriptionRegex = /^.{1,200}$/;
    const locationRegex = /^[a-zA-Z\s]{1,50}$/;

    if (!titleRegex.test(titleValue) ||
        !priceRegex.test(priceValue) ||
        !descriptionRegex.test(descriptionValue) ||
        !locationRegex.test(locationValue)) {
        const errorMessage = document.createElement(`div`);
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `Please fill out every field correctly!`;
        errorMessage.style.color = `red`;
        errorMessage.style.fontFamily = `Poppins', sans-serif`
        errorMessage.style.fontWeight = `300`
        formWrapper.append(errorMessage);
    } else {
        const successMessage = document.createElement(`div`);
        successMessage.innerHTML = `Listing was created successfully`;
        successMessage.style.color = `green`
        successMessage.style.fontFamily = `Poppins', sans-serif`
        successMessage.style.fontWeight = `300`
        formWrapper.append(successMessage);

        const listingData = {
            name: formTitle.value,
            price: `$${formPrice.value}`,
            description: formDescription.value,
            location: formLocation.value,
            image: formImage.value
        }

        const response = await fetch(`https://65c5f748e5b94dfca2e0aa0a.mockapi.io/listing`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },            
            body: JSON.stringify(listingData),
        })
        setTimeout(() => {
            const redirectedMessage = document.createElement(`p`)
            redirectedMessage.innerHTML = `Now you will be redirected to home page`
            redirectedMessage.style.color = `green`
            redirectedMessage.style.textAlign = `center`
            redirectedMessage.style.fontFamily = `Poppins', sans-serif`
            redirectedMessage.style.fontWeight = `300`
            createListingWrapper.append(redirectedMessage) 
        }, 1500);

        setTimeout(() => {
            window.location.href = `../index.html`
        }, 5000);
    }
});
