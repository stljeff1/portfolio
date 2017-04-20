		(function($, kendo) {

			var getAge = function(bday, now) {
				//return age;
			}

			var calcUnBirthday = function(bday, today) {

				//get difference between two dates, in milliseconds
				var diff = today.getTime() - bday.getTime();

				//find age be converting difference into Date, then subtracting from 1970.
				//ref: http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
				var diffDate = new Date(diff);
				var age = Math.abs(diffDate.getUTCFullYear() - 1970);
				

				//calculate days since birthdate by converting the difference into days.
				var daysSince = Math.ceil(diff / (1000 * 60 * 60 * 24));

				//calculate unbirthdays
				var unBirthdays = daysSince - age;

				return unBirthdays;
			};

			var isBirthday = function(bday, today) {
				// Function that returns day and month of date
				var getDate = function(date) {
					return {
						day: date.getDate(),
						month: date.getMonth()
					};
				};

				var birthDate = getDate(bday);
				var todayDate = getDate(today);
				return (birthDate.day == todayDate.day && birthDate.month == todayDate.month);
			}

			$(function() {
				var $results = $('.hizzle-unbizzle');
				var $confetti = $('<div class="confetti-container"/>');
				var validator;

				for (var i = 0; i < 20; i++) {
					$confetti.append('<div class="confetti"/>');
				}


				validator = $("#picker-container").kendoValidator({

					//Add your rules.  This one checks if the value is a valid date.
					rules:{
						dateRule: function(e){
							var isDate = kendo.parseDate($(e).val());
							if (!isDate){
								return false;
							}
							return true;
						}
					},

					//messages for failing validation
					messages: {
						required: "This datepicker requires a value.",
						dateRule: "The value provided is not a date. Must be mm/dd/yyyy."
					}
				}).data('kendoValidator');

				$('#MyDatePicker').kendoDatePicker({
					start: 'decade',

					change: function() {
						
						var bday = this.value();
						var today = new Date();
						var uns = calcUnBirthday(bday, today);
						console.log(isBirthday(bday, today));

						if(isBirthday(bday, today)) {
							$results.append('<h3>Happy Birthday!</h4><p>You enjoy yourself today!<p> ');
						}
						else {
							$results.addClass('unBirthday').append('<h3>Happy Unbirthday to you!</h3><p>You have had ' + uns + ' unbirthdays!').append('<div class"flex-video"><iframe src="https://www.youtube.com/embed/iL2Wm-PcfPo?autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
							$confetti.insertAfter($results);
						}
					}
				}).on({
					'focus': function() {
						$results.empty();
						$confetti.remove();
					},
					'keyup': function(e) {
						var keyCode = (event.which ? event.which : event.keyCode);
						var value = $(this).val();
						if (keyCode === 13) {
							var datepicker = $(this).data('kendoDatePicker');
							if(validator.validate(this)) {
								datepicker.value(value);
							}
						}
					}
				});

			})

		})(jQuery, kendo);