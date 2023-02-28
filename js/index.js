var getKey = "998c2819029d4ece9bff22855ab7614e"
var getFiveNews = []

// Start Get From Html Function 
function getDropFromHtml() {
    var get = {
        countryList: document.querySelectorAll("#country li"),
        categoryList: document.querySelectorAll("#category li")
    }
    return get
}
function getDisplayNewsFromHtml() {
    return document.querySelectorAll(".card")
}
function getCloseIconFromHtml() {
    return document.querySelector("#CloseIcon")
}
function getNewsDetailsFromHtml() {
    return document.querySelector(".newsDetails")
}
function getNewsDetailsContentDataFromHtml() {
    return document.querySelector("#newsDetailsContentData")
}
// End Get From Html Function 
// Start Create Function 
function createCountry(countryList) {
    var country = document.querySelector("#country")
    var countryShortlist = [
        "AR", "AU", "AT", "BE", "BR", "BG", "CA", "CN", "CO", "CU", "CZ", "EG", "FR", "DE", "GR", "HK", "HU", "IN", "ID", "IE", "IT", "JP", "KR", "LV", "LT", "MY", "MX", "MA", "NL", "NG", "NO", "PH", "PL", "PT", "RO", "RS", "RU", "SA", "SG", "SK", "SI", "ZA", "SE", "CH", "TW", "TH", "TR", "UA", "AE", "GB", "US", "VE"
    ]
    var cartona = ''
    var count = 1
    for (let i = 0; i < countryList.length; i++) {
        if (countryShortlist.includes(countryList[i].Code)) {
            if (count == 0)
                cartona += `<li><a id="${countryList[i].Code}" class="dropdown-item menuActive">${countryList[i].Name}</a></li>`
            else
                cartona += `<li><a id="${countryList[i].Code}" class="dropdown-item">${countryList[i].Name}</a></li>`

            count++
        }
        country.innerHTML = cartona
    }
}
function createCategory() {
    var category = document.querySelector("#category")
    var categoryList = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"]
    var cartona = ''
    var count = 1
    for (let i = 0; i < categoryList.length; i++) {
        if (count == 0)
            cartona += `<li><a class="dropdown-item menuActive">${categoryList[i]}</a></li> `
        else
            cartona += `<li><a class="dropdown-item">${categoryList[i]}</a></li> `
        count++
        category.innerHTML = cartona
    }
}
// End Create Function 
// Start Add Event Function 
function addEventToCountryList() {
    for (var i = 0; i < getDropFromHtml().countryList.length; i++) {
        getDropFromHtml().countryList[i].addEventListener("click", function (e) {
            removeClassFromHome()
            removeClassFromCountry(getDropFromHtml().countryList)
            e.target.classList.add("menuActive")
            getNews()
        })
    }
}
function addEventToCategoryList() {
    for (var i = 0; i < getDropFromHtml().categoryList.length; i++) {
        getDropFromHtml().categoryList[i].addEventListener("click", function (e) {
            removeClassFromHome()
            removeClassFromCategory(getDropFromHtml().categoryList)
            e.target.classList.add("menuActive")
            getNews()
        })
    }
}
function addEventToDisplayNews() {
    for (var i = 0; i < getDisplayNewsFromHtml().length; i++) {
        getDisplayNewsFromHtml()[i].addEventListener("click", function (e) {
            console.log(55);
            if (e.target.localName == "h3" || e.target.localName == "p")
                displayNewsDetails(e.target.parentElement.parentElement.id);
            else if (e.target.localName == "img" || e.target.localName == "div")
                displayNewsDetails(e.target.parentElement.id);
        })
    }
}
function addEventToCloseIcon() {
    getCloseIconFromHtml().addEventListener("click", closeIcon)
}
function addEventToNewsDetails() {
    getNewsDetailsFromHtml().addEventListener("click", function (e) {
        if (e.target.className == "newsDetails")
            closeIcon()
    })
}
// End Add Event Function 
// Start Remove Active Function 
function removeClassFromHome() {
    var homeLink = document.querySelector("#homeLink")
    homeLink.className = "nav-link"
}
function removeClassFromCountry(list) {

    for (var y = 0; y < list.length; y++) {
        list[y].children[0].classList.remove("menuActive")
    }
}
function removeClassFromCategory(list) {
    for (var y = 0; y < list.length; y++) {
        list[y].children[0].classList.remove("menuActive")
    }
}
// End Remove Active Function 
// Start Search Function 
function getSearch() {
    var searchValue = { countryId: "", countryName: "", categoryName: "" }
    for (var i = 0; i < getDropFromHtml().countryList.length; i++) {
        if (getDropFromHtml().countryList[i].children[0].className == "dropdown-item menuActive") {
            searchValue.countryId = getDropFromHtml().countryList[i].children[0].id
            searchValue.countryName = getDropFromHtml().countryList[i].children[0].innerText
        }
    }
    for (var i = 0; i < getDropFromHtml().categoryList.length; i++) {
        if (getDropFromHtml().categoryList[i].children[0].className == "dropdown-item menuActive") {
            searchValue.categoryName = getDropFromHtml().categoryList[i].children[0].innerText
        }
    }
    return searchValue
}
async function getNews() {
    var categoryName = getSearch().categoryName == "" ? "Sports" : getSearch().categoryName
    var countryId = getSearch().countryId == "" ? "EG" : getSearch().countryId
    var countryName = getSearch().countryName

    var getData = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryId}&category=${categoryName}&apiKey=${getKey}`)

    var dateResulte = await getData.json()
    getFiveNews.splice(0)
    getFiveNews.push({ categoryName,countryName, articles: dateResulte.articles })
    displayNewsInPageLoad()
}
async function getNewsInPageLoad() {
    var GetCountryLength = getDropFromHtml().countryList.length
    var categoryName = "Sports"
    var fiveCountry = []
    for (var i = 0; i < 5; i++) {
        var randomNumber = Math.floor(Math.random() * GetCountryLength)
        var number = randomNumber < 0 ? 0 : randomNumber
        var countryShort = getDropFromHtml().countryList[number].children[0].id
        if (fiveCountry.includes(countryShort) !== true) {
            var countryName = getDropFromHtml().countryList[number].children[0].innerText
            var getData = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryShort}&category=${categoryName}&apiKey=${getKey}`)
            var dateResulte = await getData.json()
            getFiveNews.push({ categoryName, countryName, articles: dateResulte.articles })
            fiveCountry.push(countryShort);
        }
    }
    displayNewsInPageLoad(4)
}
// End Search Function

// Start Display And Close Function

function displayNewsInPageLoad(count) {
    var getDisplayNews = document.querySelector("#displayNews")
    var rowCartona = ''

    for (var i = 0; i < getFiveNews.length; i++) {
        rowCartona += `<div class="row mb-3 g-4">
        <h3 class="mb-2">${getFiveNews[i].categoryName + " "}${getFiveNews[i].countryName} News</h3>  
        </div>`
    }
    getDisplayNews.innerHTML = rowCartona

    document.querySelector("#displayNews").innerHTML = rowCartona
    var DisplayNewsRow =""
    if (count != null)
        DisplayNewsRow = document.querySelectorAll(".row")
    else
        DisplayNewsRow = document.querySelector(".row")

    for (var index = 0; index < 5; index++) {
        var cartona2 = ''
        var getCount = count != null ? count : getFiveNews[index]?.articles.length
        for (var y = 0; y < getCount; y++) {
            cartona2 += ` 
            <div class="col-md-3">
            <div class="card" id="News-${index}-${y}" style="width: 18rem;">
                <img src="${getFiveNews[index]?.articles[y].urlToImage != null ? getFiveNews[index]?.articles[y].urlToImage : "./img/newsAvatar.jpg"}" alt="${getFiveNews[index]?.articles[y].author.split(" ").splice(0, 2).join(" ")}">
                <div class="card-body">
                <h3>${getFiveNews[index]?.articles[y].author.split(" ").splice(0, 2).join(" ")}</h3>
                <p class="card-text">${getFiveNews[index]?.articles[y].title.split(" ").splice(0, 3).join(" ")}</p>
                </div>
            </div>
        </div>`
        }
        count != null ? DisplayNewsRow[index].innerHTML += cartona2 : DisplayNewsRow.innerHTML += cartona2
        count != null ? cartona2 = '' : ""
    }
    addEventToDisplayNews()
}
function displayNewsDetails(displayID) {
    getNewsDetailsFromHtml().style.display = "flex"
    var country = displayID.split("-")[1]
    var newsDetails = displayID.split("-")[2]
    var cartona = `
         <div class="col-md-4 detailsBox">
             <img src="${getFiveNews[country].articles[newsDetails].urlToImage != null ? getFiveNews[country].articles[newsDetails].urlToImage : "./img/newsAvatar.jpg"}" class="detailsImage" alt="${getFiveNews[country].articles[newsDetails].author.split(" ").splice(0, 2).join(" ")}">
         </div>
         <div class="col-md-8">
             <div class="ms-2">
                <h3>${getFiveNews[country].articles[newsDetails].author}</h3>
                <p>${getFiveNews[country].articles[newsDetails].title}</p>
             </div>
         </div>
         `
    getNewsDetailsContentDataFromHtml().innerHTML = cartona
}
function closeIcon() {
    getNewsDetailsFromHtml().style.display = "none"
}
// End Display And Close Function


(async function () {
    var countryApi = await fetch("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json")
    var countryList = await countryApi.json()
    createCountry(countryList)
    createCategory()
    addEventToCountryList()
    addEventToCategoryList()
    await getNewsInPageLoad()
    // addEventToDisplayNews()
    addEventToCloseIcon()
    addEventToNewsDetails()
    // getNews()
})();

