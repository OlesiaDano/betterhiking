$(function () {

//Star rating settings
//Star rating view
	$(".demo").starRating({
		initialRating: 0,
		strokeWidth: 10,
		starSize: 25
	});

	$(".reviewer__rating").starRating({
		initialRating: 0,
		strokeWidth: 10,
		starSize: 25,
		emptyColor: 'white',
		strokeColor: 'black',
		strokeWidth: 7,
	});

//Diiing to busket functionality
//busket array that will be added to Local Storage
	var basket = [];

	$(".item__add-btn").off().on('click', function (event) {

		//Open basket on product add-button click
		$('body').css('overflow', 'hidden');
		$(".user__outer").addClass("active");

		setItemToStorage(event);
		showItemsInBasket();

		return false
	});

	//Set item to local storage
	function setItemToStorage(event) {
		event.stopPropagation()
		// 1. Try to get 'basket' from local sorage, possibly it is there
		var getBasketFromStorage = localStorage.getItem("basket");
		// 2. Try to parse it (to get objects from there), and fill our 'basket' array variable by them. But in case storage is empty, lets leave an empty array
		basket = JSON.parse(getBasketFromStorage) || [];
		// 3. Push new product object to basket array variable
		basket.push(event.target.dataset.product);
		// 4. Write basket array variable with product objects to local sorage with key 'basket'
		localStorage.setItem('basket', JSON.stringify(basket));
	}

	//Get & show items from local storage
	function showItemsInBasket() {
		var productsData = $("#items__data");

		//clear data before load new from storage
		if (productsData.length) {
			productsData.empty();
		}

		//getting new data
		var basketFromStorage = JSON.parse(localStorage.getItem("basket"));

		//variable for total order value & qty of items
		let sumTotal = 0;
		let sumItems = 0;

		basketFromStorage.forEach(element => {
			//parsing each element & add properties to newly created tags
			var el = JSON.parse(element);
			const itemData = document.createElement("div");
			const productName = document.createElement("div");
			const productQty = document.createElement("div");
			const productPrice = document.createElement("div");

			itemData.className = "bag__product-data";
			productName.className = "bag__product-name";
			productQty.className = "bag__product-qty";
			productPrice.className = "bag__product-value";

			productName.innerHTML = el.name;
			productQty.innerHTML = el.quantity;
			productPrice.innerHTML = el.currency + el.price;
			sumTotal = sumTotal + parseInt(el.price);
			sumItems = sumItems + parseInt(el.quantity);

			itemData.append(productName, productQty, productPrice);
			productsData.append(itemData);

			$(".bag__counter, .bag__qty").text(JSON.parse(localStorage.getItem("basket")).length);

		});

		//Count total bag price with delivery, items qty & show
		let deliveryCost = 4.99;
		sumTotal = sumTotal + deliveryCost;
		console.log("deliveryCost: " + typeof deliveryCost);
		$(".bag__delivery-value").text(deliveryCost);

		//Currency for total sum
		let regionCurrency = "$";
		$(".bag__total-value").text(regionCurrency + (sumTotal).toFixed(2));

		//text for 1 or multiple qty ofitems in bag
		let items = sumItems == 1 ? " item" : " items";
		console.log("items: " + items);
		$(".bag__qty").text((sumItems) + items);
	};

	//Bag opening settigs
	//disable scroll while bag is open
	$(".bag").off().on('click', function () {
		$('body').css('overflow', 'hidden');
		$(".user__outer").toggleClass("active");
		showItemsInBasket();
	});
	//close bag on close button
	$(".bag__close").off().on('click', function () {
		$(".user__outer").removeClass("active");
		$('body').css('overflow', 'visible');
	});
	//
	$(".user__outer").off().on('click', function () {
		$(".user__outer").removeClass("active");
	});

	$('.user__bag').off().on('click', function (event) {
		event.stopPropagation();
	});

	//Items counter
	var basketLength = JSON.parse(localStorage.getItem("basket"));
	//to avoid 'Cannot read properties of null (reading 'length')' error assignong "0" when there is no basket length
	basketLength = basketLength?.length ? basketLength.length : 0;

	$(".bag__counter").text(basketLength);
	$(".bag__qty").text(basketLength);

	//Submit basket
	$(".bag__submit").off().on('click', function () {
		$(".user__outer").removeClass("active");
		$(".user__message").addClass("active");
		$(".user__message-text").text("Your order placed successfully!");
		$(".bag__counter, .bag__qty, .bag__total-value").text("0");
		localStorage.removeItem("basket");

		//Hide success message in 1 sec & enable scroll for body
		setTimeout(function () {
			$(".user__message").removeClass("active");
		}, 1000);
		$('body').css('overflow', 'visible');

		$(".wishlist__counter").text(JSON.parse(localStorage.getItem("wishlist")).length);
	});


	$(".wishlist__add-btn").off().on('click', function (event) {

		//Open basket on product add-button click
		$('body').css('overflow', 'hidden');
		$(".wishlist__outer").addClass("active");

		setWishToStorage(event);
		showWishesInWishlist();

		return false
	});


//wishlist array added to localstorage	
	var wishlist = [];

	function setWishToStorage(event) {
		event.stopPropagation()
		// 1. Get 'whishlist' from local sorage, possibly it is there
		var getWishlistFromStorage = localStorage.getItem("wishlist");
		// 2. Parse it (to get objects from there), and fill our 'wishlist' array variable by them. But in case storage is empty, lets leave an empty array
		wishlist = JSON.parse(getWishlistFromStorage) || [];
		// 3. Push new product object to basket array variable
		wishlist.push(event.target.dataset.product);
		// 4. Write basket array variable with product objects to local sorage with key 'wishlist'
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
	}

	function showWishesInWishlist() {
		var productsData = $("#wishlist__data");

		if (productsData.length) {
			productsData.empty();
		}

		var wishlistFromStorage = JSON.parse(localStorage.getItem("wishlist"));
		wishlistFromStorage.forEach(element => {

			var el = JSON.parse(element);
			const itemData = document.createElement("div");
			const productName = document.createElement("div");
			const productQty = document.createElement("div");
			const productPrice = document.createElement("div");

			itemData.className = "bag__product-data";
			productName.className = "bag__product-name";
			productQty.className = "bag__product-qty";
			productPrice.className = "bag__product-value";

			productName.innerHTML = el.name;
			productQty.innerHTML = el.quantity;
			productPrice.innerHTML = el.currency + el.price;

			itemData.append(productName, productQty, productPrice);
			productsData.append(itemData);

			$(".wishlist__counter").text(JSON.parse(localStorage.getItem("wishlist")).length);

		});
	};

	//Wishlist opening settings
	$(".wishlist").off().on('click', function () {
		$('body').css('overflow', 'hidden');
		$(".wishlist__outer").toggleClass("active");
		showWishesInWishlist();
	});

	$(".wishlist__close").off().on('click', function () {
		$(".wishlist__outer").removeClass("active");
		$('body').css('overflow', 'visible');
	});

	$(".wishlist__outer").off().on('click', function () {
		$(".wishlist__outer").removeClass("active");
	});

	$('.wishlist__inner').off().on('click', function (event) {
		event.stopPropagation();
	});

	//Wishlist couter
	$(".wishlist__counter").text(JSON.parse(localStorage.getItem("wishlist")).length);

	//Show existing list by default
	var getUserFromStorage = localStorage.getItem("user");
	let user = [];
	user = JSON.parse(getUserFromStorage) || [];
	localStorage.setItem('user', JSON.stringify(user));

	if (user.length < 1) {
		$(".noreview-title").addClass("active");
	} else if (user.length > 0) {
		$(".noreview-title").removeClass("active");
		createReviewList();
	}



//PDP REVIEW FORM
	class User {
		constructor(name, surname, review, comfort, fit, overall, quality) {
			this.name = name,
			this.surname = surname,
			this.review = review,
			this.comfort = comfort,
			this.fit = fit,
			this.overall = overall,
			this.quality = quality
		}
	}

	//function creates review card content elements & fulfills them with data from localstorage array 'user'
	const createReviewList = () => {
		var usersData = $(".reviews__list");

		if (usersData.length) {
			usersData.empty();
		}

		var userFromStorage = JSON.parse(localStorage.getItem("user"));

		// const currentReviews = JSON.parse(localStorage.user);
		userFromStorage.forEach(element => {
			let reviewItem = document.createElement("li");
			let reviewRatings = document.createElement("div");

			let reviewRatingsList = document.createElement("ul");

			let reviewComfortRatings = document.createElement("li");
			let reviewComfortTitle = document.createElement("span");
			let reviewComfortValue = document.createElement("div");

			let reviewFitRatings = document.createElement("li");
			let reviewFitTitle = document.createElement("span");
			let reviewFitValue = document.createElement("div");

			let reviewOverallRatings = document.createElement("li");
			let reviewOverallTitle = document.createElement("span");
			let reviewOverallValue = document.createElement("div");

			let reviewQualityRatings = document.createElement("li");
			let reviewQualityTitle = document.createElement("span");
			let reviewQualityValue = document.createElement("div");

			let reviewText = document.createElement("p");
			let reviewSignature = document.createElement("span");


			reviewItem.className = "review";
			reviewRatings.className = "ratings";

			reviewRatingsList.className = "rating__list";

			reviewComfortRatings.className = "rating__item";
			reviewComfortTitle.className = "rating__name";
			reviewComfortValue.className = "comment__review review-rating comment_comfort jq-stars";

			reviewFitRatings.className = "rating__item";
			reviewFitTitle.className = "rating__name";
			reviewFitValue.className = "comment__review review-rating comment_fit jq-stars";

			reviewOverallRatings.className = "rating__item";
			reviewOverallTitle.className = "rating__name";
			reviewOverallValue.className = "comment__review review-rating comment_overall jq-stars";

			reviewQualityRatings.className = "rating__item";
			reviewQualityTitle.className = "rating__name";
			reviewQualityValue.className = "comment__review review-rating comment_quality jq-stars";

			reviewText.className = "review__text";
			reviewSignature.className = "post_data";

			// reviewComfortValue.className = "demo comfort jq-stars review-rating";

			reviewItem.append(reviewRatings, reviewText, reviewSignature);

			reviewRatings.append(reviewRatingsList);
			reviewRatingsList.append(reviewComfortRatings, reviewFitRatings, reviewOverallRatings, reviewQualityRatings);

			reviewComfortRatings.append(reviewComfortTitle, reviewComfortValue);
			reviewFitRatings.append(reviewFitTitle, reviewFitValue);
			reviewOverallRatings.append(reviewOverallTitle, reviewOverallValue);
			reviewQualityRatings.append(reviewQualityTitle, reviewQualityValue);

			reviewText.innerText = element.review;
			reviewSignature.innerText = "by " + element.name + " " + element.surname;

			reviewComfortTitle.innerText = "Comfort";
			reviewFitTitle.innerText = "Fit";
			reviewOverallTitle.innerText = "Overall";
			reviewQualityTitle.innerText = "Quality";


			usersData.append(reviewItem);

			//Star rating view
			$(".comment__review").starRating({
				initialRating: 0,
				strokeWidth: 10,
				starSize: 20
			});

			//Assigning user rating values to his comment view
			$(reviewComfortValue).starRating('setRating', element.comfort);
			$(reviewFitValue).starRating('setRating', element.fit);
			$(reviewOverallValue).starRating('setRating', element.overall);
			$(reviewQualityValue).starRating('setRating', element.quality);

			$(reviewComfortValue).starRating('setReadOnly', true);
			$(reviewFitValue).starRating('setReadOnly', true);
			$(reviewOverallValue).starRating('setReadOnly', true);
			$(reviewQualityValue).starRating('setReadOnly', true);

			$(".comfort").starRating('setReadOnly', false);
			$(".fit").starRating('setReadOnly', false);
			$(".overall").starRating('setReadOnly', false);
			$(".quality").starRating('setReadOnly', false);

		});
	}

	// Overall PDP rating
	let setAvarageProductRating = (userFromStorage) => {
		let overallReviwResults = [];

		userFromStorage.forEach(element => {
			overallReviwResults.push(parseInt(element.overall));
		});

		const averageReviewResult = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
		const reviewResult = averageReviewResult(overallReviwResults);

		$(".pdp__ovarall-rating").starRating('setRating', reviewResult);
		$(".pdp__ovarall-rating").starRating('setReadOnly', true);
	};


	//Add a comment
	let [...reviwerInput] = document.querySelectorAll(".client__data-item");
	let [...reviwerRewiew] = document.querySelectorAll(".client__rewiew-data");

	reviwerResult = reviwerInput.map(function (element) {
		return element;
	});

	const validate = (target) => {
		if (target.id === "client__name"
			|| target.id === "client__surname") {
			return /^[A-z]{2,}$/i.test(target.value);
		} else if (target.id === "client__text") {
			return target.value !== "undefined" ? true : false;
		} else {
			throw new Error("Your entering is not correct...");
		}
	}


	reviwerResult.forEach((element) => {
		$(element).on('change', function (event) {
			validate(event.target);
		});
	});


	$("#rating__form").on('submit', function (e) {
		//Remove no-review title onclick
		$(".noreview-title").removeClass("active");

		//validation function after click
		let response = reviwerResult.map(function (element) {
			return validate(element);
		});

		let reviwerRewiewResult = reviwerRewiew.map(function (element) {
			element.value = $(element).starRating('getRating');
			return element;
		});

		const reviwerResultAndReview = reviwerResult.concat(reviwerRewiewResult);

		//Check if any issues in inputs
		if (!response.includes(false)) {
			user.push(
				new User(
					...reviwerResultAndReview.map(element => {
						return element.value;
					})));
			localStorage.setItem('user', JSON.stringify(user));

			//Clear form inputs
			reviwerResultAndReview.map(element => element.value = '');

			//Create comment
			createReviewList();
		} else {
			e.preventDefault();
			$(".no-rating").addClass("active");
			console.log("Something went wrong...");
		}

		//Clear ratings via destroy of rating items
		let formStarRating = document.querySelectorAll('.pdp-form-rating');
		formStarRating.forEach(element => {
			$(element).starRating('unload');
		});

		//Restore rating items for next review
		let comfortStarRating = document.createElement("div");
		let fitStarRating = document.createElement("div");
		let overallStarRating = document.createElement("div");
		let qualityStarRating = document.createElement("div");

		comfortStarRating.className = "comfort pdp-form-rating client__rewiew-data jq-stars review-rating reviewer__rating";
		fitStarRating.className = "fit pdp-form-rating client__rewiew-data jq-stars review-rating reviewer__rating";
		overallStarRating.className = "overall pdp-form-rating client__rewiew-data jq-stars review-rating reviewer__rating";
		qualityStarRating.className = "quality pdp-form-rating client__rewiew-data jq-stars review-rating reviewer__rating";

		$(".comfort__item").append(comfortStarRating);
		$(".fit__item").append(fitStarRating);
		$(".overall__item").append(overallStarRating);
		$(".quality__item").append(qualityStarRating);

		$(".reviewer__rating").starRating({
			initialRating: 0,
			strokeWidth: 10,
			starSize: 25,
			emptyColor: 'white',
			strokeColor: 'black',
			strokeWidth: 7,
		});


		//Call avarage rating to refrash page after changes
		setAvarageProductRating(user);

	});


//Close menu on click to elsewhere
	const $menu = $(".menu__list, .menu__btn");

	const onMouseUp = e => {
		// If the target of the click isn't the container...
		if (!$menu.is(e.target)) {
			$menu.removeClass("active");
		}
	}
	
	//Show & close menu on click to burger
	$('.menu__btn').off().on('click', () => {
		$menu.toggleClass("active").promise().done(() => {
			if ($menu.hasClass("active")) {
				$(document).on('mouseup', onMouseUp) // Only listen for mouseup when menu is active...
			} else {
				$(document).off('mouseup', onMouseUp) // else remove listener.
			}
		})
	});

//Show filters section list on click to arrow or title
	$(".filters__title").off().on('click', function (event) {
		$(event.target.nextElementSibling).toggleClass("active");
		$(event.target).toggleClass("active");
	});

	//Show filters navigation on click to filter button
	$(".filter__dymanic").off().on('click', function () {
		$(".filters").toggleClass("active");
	});

	$(".filters__close").off().on('click', function () {
		$(".filters").removeClass("active");
	});

	//on resize to desctop if filters popup are active - close filters popup, as they are present in desctop version
	window.addEventListener("resize", function () {
		if (window.innerWidth < 1200)
			$(".filters").resize.classList.remove("active");
	});


	//Filter items by color
	let [...plpProducts] = document.querySelectorAll(".plp__item");

	$(".color__item").off().on('click', function (event) {

		plpProducts.forEach(element => {
			element.setAttribute("style", "display: none");
		});

		let productColor = JSON.parse(event.target.dataset.product);
		let color = productColor.color;

		plpProducts.forEach(element => {
			let selectedItemColor = JSON.parse(element.dataset.product);
			let filteredItem = selectedItemColor.color;

			if (filteredItem === color) {
				element.setAttribute("style", "display: flex");
			}

		});

		//If thete are no items of selected color - show message
		if ($(".plp__item").length === $(".plp__item:hidden").length) {
			$(".no-item__title").addClass("active");
		}
	});

	//Filter items by size
	$(".size__item").off().on('click', function (event) {

		plpProducts.forEach(element => {
			element.setAttribute("style", "display: none");
		});

		let productSize = JSON.parse(event.target.dataset.product);
		let size = productSize.size;

		plpProducts.forEach(element => {
			let selectedItemColor = JSON.parse(element.dataset.product);
			let filteredItem = selectedItemColor.size;
			const availableSizes = filteredItem.split(', ');

			availableSizes.forEach(availableItem => {
				if (availableItem === size) {
					element.setAttribute("style", "display: flex")
				}
			});
		});

		//If thete are no items of selected color - show message
		if ($(".plp__item").length === $(".plp__item:hidden").length) {
			$(".no-item__title").addClass("active");
		}
	});

	//Filter items by name
	$('.shorts').val(this.checked);

    $('.bottoms__checkbox').off().on('change', function(event) {

		// Selecting all values from checked checkboxes and pushing them to array
		var productTypesFilterValues = [];
		$('.bottoms__checkbox:checked').each(function(i, element) {
			let productObject = JSON.parse(element.dataset.product);
			productTypesFilterValues.push(productObject.name);
		});

		// Filtering product tiles by values from array
		plpProducts.forEach(element => {
			let productItem = JSON.parse(element.dataset.product);
			let productItemName = productItem.name;
			if (productTypesFilterValues.indexOf(productItemName) !== -1) {
				element.setAttribute("style", "display: flex");
			} else {
				element.setAttribute("style", "display: none");
			}
		});

		// Showing all product tiles if no filtes checked
		if (productTypesFilterValues.length === 0) {
			$(".plp__item").css("display", "flex");
		}            
    });	


	
	//Call avarage rating by default
	setAvarageProductRating(user);

	//PDP Carousel

	const mainImage = document.getElementById("main-image");
	const images = document.querySelectorAll(".product__image");

	images.forEach((image) => {
	    image.addEventListener("click", (event) => {
	        mainImage.src = event.target.src;

	        document.querySelector(".product__image.active").classList.remove("active");

	        event.target.classList.add("active");
	    });
	});

});
