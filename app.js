window.onload = ()=> {
	handleCartBtn()
	handleAOS()
	handleCartWindow()
	handleNav()
}

function handleNav(){
	const nav = document.querySelector(".nav")
	const closeBtn = document.querySelector(".close-nav")
	const openBtn = document.querySelector('.hamburger')
	closeBtn.addEventListener('click', function(){
		nav.style.transform = 'translateX(-420px)'
	})
	openBtn.addEventListener('click', function(){
		nav.style.transform = 'translateX(0px)'
	})
}

function handleCartWindow(){
	const btn = document.querySelector("#cart-close")
	const cartWindow = document.querySelector(".cart-window")
	const cartIcon = document.querySelector(".cart-icon")
	btn.addEventListener('click', function(){
		cartWindow.style.transform = "translateX(420px)"
	})
	cartIcon.addEventListener('click', function(){
		cartWindow.style.transform = "translateX(0px)"
	})
}

function handleCartBtn(){
	const btn = document.querySelectorAll(".cart-btn-container")
	const inner = document.querySelectorAll(".cart-btn-inner")
	const text = document.querySelectorAll(".cart-btn-text")

	btn.forEach((item, i) => {
		item.addEventListener('mouseover', function() {
			inner[i].classList.add('cart-btn-inner-toggle')
			text[i].classList.add('cart-btn-text-toggle')
		})
		item.addEventListener('mouseout', function() {
			inner[i].classList.remove('cart-btn-inner-toggle')
			text[i].classList.remove('cart-btn-text-toggle')
		})
	})
}


function handleAOS(){
	const productDescription = document.querySelectorAll('.product-description')
	const productImage = document.querySelectorAll('.product-image')

	AOS(productDescription, "toggle1", 500)
	AOS(productImage, "toggle2", 1200)

	function AOS(target, classname, topMinus){
		target[0].classList.add(classname)
		const targetTop = []
		target.forEach((item, i) => {
			targetTop.push(item.getBoundingClientRect())
		})
		window.addEventListener('scroll', function(){
			targetTop.forEach((item, i) => {
				if(window.pageYOffset >= item.top - topMinus){
					if(i!==0)
						target[i].classList.add(classname)
				} else if(window.pageYOffset >= item.height + 200){
					if(i!==0)
						target[i].classList.remove(classname)
				}
			})
		})
	}
}
