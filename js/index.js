    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navButtonBorderColor: 'rgba(29, 209, 0, 0.40)',
            navButtonBg: 'rgba(29, 209, 0, 0.10)',
            green: '#1DD100',
            couponBg1: '#FFBF0F',
            couponHeading: 'rgba(3, 7, 18, 0.80)',
            couponP: 'rgba(3, 7, 18, 0.50)',
            couponBg2: '#F78C9C',
            ticketBg: '#F7F8F8',
            destinationBg: '#F7F8F8',
            locationBg: 'rgba(3, 7, 18, 0.05)',
            seatLeftBg: 'rgba(29, 209, 0, 0.15)',
            available:'rgba(3, 7, 18, 0.50)',
            driverSeatBg: 'rgba(3, 7, 18, 0.10)',
            seatBg: '#F7F8F8',
            success: '#27AE60'
          }
        }
      }
    }

    const mainSeat = document.getElementsByClassName('main-seat');
    let remainingSeat = 40; // -1
    let ticketPrice = 0; // + 550;
    let grandTotalCount = 0;
    let limitSeat = 0; // +1
    let selectedSeat = 0; // +1

    const seatLeft = document.getElementById('seat-left');
    const formSubmit = document.getElementById('form-submit');
    const seatCount = document.getElementById('seat-count');
    const total = document.getElementById('total');
    const grandTotal = document.getElementById('grand-total');
    const coupon = document.getElementById('coupon');
    const couponCode = document.getElementById('coupon-code');
    const couponCodeApply = document.getElementById('coupon-code-apply');

    //
    const showSelectedSeatSection = document.getElementById('show-seat');
    const calculationSection = document.querySelector('.calculation')

    for (const singleSeat of mainSeat) {
      $(singleSeat).click((e) => {
        console.log("Hello", e.target.innerText, limitSeat);
        const seat = e.target;
        const selectedSeatID = e.target.innerText;
        if (limitSeat <= 3) {
            limitSeat++;
            remainingSeat--;
            selectedSeat++;
            // selected seat color change
            seat.classList.add("bg-green", "text-white");
            seat.classList.remove("bg-seatBg");
            // changing the set-left
            seatLeft.innerText = remainingSeat;
            // form-submit button
            formSubmit.classList.add("bg-green");
            formSubmit.removeAttribute("disabled");
            // seat count ++
            seatCount.classList.add('bg-green');
            seatCount.innerText = selectedSeat;
            // creating span and appending it into calculationSection
            showSeats(selectedSeatID)
            // update total
            ticketPrice = ticketPrice + 550;
            total.innerText = ticketPrice;
            // udate grandTotal
            grandTotalCount = grandTotalCount + 550;
            grandTotal.innerText = grandTotalCount;

            // coupon code section logic
            checkCoupon()
            handleClick(e.target);
        } 
      })
    }


    //// On submit function
    function handleSubmit (e) {
      e.preventDefault();
      if (limitSeat > 0) {
        document.getElementById('my_modal_1').showModal();
        resetEveryThing()
      }
    }

    function handleClick(clickedButton) {
    clickedButton.disabled = true;
  }
    
    function resetEveryThing() {
      remainingSeat = 40;
      limitSeat = 0;
      selectedSeat = 0;
      ticketPrice = 0;
      grandTotalCount = 0;
      seatLeft.innerText = remainingSeat;
      seatCount.classList.remove('bg-green');
      seatCount.innerText = selectedSeat;
      total.innerText = ticketPrice;
      grandTotal.innerText = grandTotalCount;
      formSubmit.classList.remove("bg-green");
      formSubmit.setAttribute("disabled", "true");
      while (showSelectedSeatSection.firstChild) {
        showSelectedSeatSection.removeChild(showSelectedSeatSection.firstChild)
      };
      emptyInput('name');
      emptyInput('number');
      emptyInput('email');
      for (const singleSeat of mainSeat) {
        singleSeat.disabled = false;
        singleSeat.classList.remove("bg-green", "text-white");
        singleSeat.classList.add("bg-seatBg");
      }
    }

    function emptyInput (id) {
      const input = document.getElementById(id);
      input.value = '';
    }

    function checkCoupon() {
      if (limitSeat >= 4) {
                      // checking coupon code and update the value of grand total
                      const spanAlert = document.createElement('span');
                      spanAlert.classList.add('text-red-500', 'pr-4', 'pt-4', 'invalid-coupon');
                      calculationSection.appendChild(spanAlert);
                      const wrongCouponAlert = document.querySelector('.invalid-coupon');
                      coupon.classList.remove('hidden');
                      $(couponCodeApply).click(() => {
                        console.log(couponCode.value);
                        console.log(grandTotalCount); //
                        if (couponCode.value === 'NEW15'){
                          let discountAmount = grandTotalCount * 0.15;
                          grandTotal.innerText = grandTotalCount - discountAmount;
                          calculationSection.removeChild(wrongCouponAlert)
                          coupon.classList.add('hidden');
                        } else if (couponCode.value === 'Couple 20') {
                          let discountAmount = grandTotalCount * 0.20;
                          grandTotal.innerText = grandTotalCount - discountAmount;
                          calculationSection.removeChild(wrongCouponAlert)
                          coupon.classList.add('hidden');
                        } else {                        
                          spanAlert.innerText = "Invalid Coupon";
                        }
                      })
                    }
    }

    function showSeats (seatID) {
            const newDiv = document.createElement('div');
            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
            const span3 = document.createElement('span');
            newDiv.classList.add('flex', 'justify-between', 'w-full', 'pb-4');
            span1.classList.add('text-base', 'text-black', 'font-normal');
            span2.classList.add('text-base', 'text-black', 'font-normal');
            span3.classList.add('text-base', 'text-black', 'font-normal');
            span1.innerText = seatID;
            span2.innerText = "Economic";
            span3.innerText = "550 BDT";
            newDiv.append(span1, span2, span3);
            showSelectedSeatSection.appendChild(newDiv);
    }