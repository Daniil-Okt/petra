// Функция отправки в яндекс метрику цели на отправку формы (расскоментировать для использования)
function sendingYandexMetrika() {
//   ym(106917335,'reachGoal','leadofficialsite')
}


function checkFormUnlock(form) {
    let resultCheck = false;
    const inputFormRecord = form.querySelectorAll('._req._obligat');
    const inputFormRecordWithOk = form.querySelectorAll('._req._obligat._ok');
    const recaptcha = form.querySelector('.g-recaptcha');

    if (inputFormRecordWithOk.length === inputFormRecord.length) {
    if (recaptcha) {
        // console.log(recaptcha);
        var intervalId = setInterval(function () {
        var response = grecaptcha.getResponse();
        // console.log(response)
        if (response.length == 0) {
            resultCheck = false;
            // console.log("Рекапча не заполнена");
        } else {
            resultCheck = true;
            // console.log("Рекапча заполнена");
            form.querySelector('button').addEventListener('click', () => {
            clearInterval(intervalId);
            })
        }
        if (resultCheck) {
            form.classList.add('unlock');
        } else {
            form.classList.remove('unlock');
        }
        }, 1000);
    } else {
        resultCheck = true;
    }
    } else {
        resultCheck = false;
    }

    if (resultCheck) {
        form.classList.add('unlock');
    } else {
        form.classList.remove('unlock');
    }
}



function validForm(form) {
    const inputFormRecord = form.querySelectorAll('._req');
    const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');

    if (inputFormRecord.length > 0) {
        inputFormRecord.forEach(input => {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        });
    }

    inputFormRecord.forEach(input => {
        // Обработчик для ручного ввода
        input.addEventListener('input', function () {
            formRemoveError(input);
            inputValid(input);
            checkFormUnlock(form);
        });
        
        // Обработчик для изменений (включая автозаполнение)
        input.addEventListener('change', function () {
            formRemoveError(input);
            inputValid(input);
            checkFormUnlock(form);
        });
        
        // Дополнительная проверка при фокусе (на случай автозаполнения при загрузке)
        input.addEventListener('focus', function () {
            setTimeout(() => {
                formRemoveError(input);
                inputValid(input);
                checkFormUnlock(form);
            }, 100);
        });
    });

    submitButtons.forEach(button => {
        button.addEventListener('click', function () {
            highlightInvalidFields();
        });
    });

    form.addEventListener('submit', function () {
        highlightInvalidFields();
    });

    // Функция для принудительной проверки автозаполнения
    function checkAutofill() {
        setTimeout(() => {
            inputFormRecord.forEach(input => {
                if (input.value) {
                    formRemoveError(input);
                    inputValid(input);
                    checkFormUnlock(form);
                }
            });
        }, 500);
    }

    // Проверяем автозаполнение при загрузке
    // document.addEventListener('DOMContentLoaded', checkAutofill);
    // window.addEventListener('load', checkAutofill);
    
    function highlightInvalidFields() {
        if (form.classList.contains('unlock')) return;

        inputFormRecord.forEach(input => {
            inputValid(input);
        });

        checkFormUnlock(form);
    }

    function inputValid(input) {
        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.getAttribute("type") === "checkbox") {
            if (input.checked) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.classList.contains('password')) {
            if (input.value.length >= 8) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.classList.contains('data')) {
            if (input.value.length >= 10) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.classList.contains('tel')) {
            if (input.value.length >= 18) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.classList.contains('withdrawal')) {
            if (input.value.length >= 3) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.classList.contains('password-replay')) {
            const passwordInput = form.querySelector('.password');
            if (passwordInput && input.value === passwordInput.value) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else if (input.classList.contains('promo-code')) {
            if (input.value.length >= 4) {
                formRemoveError(input);
            } else {
                formAddError(input);
            }
        } else {
            if (input.value.trim() === '') {
                formAddError(input);
            } else {
                formRemoveError(input);
            }
        }
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
        input.parentElement.classList.remove('_ok');
        input.classList.remove('_ok');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
        input.parentElement.classList.add('_ok');
        input.classList.add('_ok');
    }

    function emailTest(input) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value.trim());
    }

    function telTest(input) {
        return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value.trim());
    }

    function syncInput() {
        var inputs = document.querySelectorAll('input[data-sync-group]');

        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                var matchGroup = this.getAttribute('data-sync-group');
                var sameGroupInputs = document.querySelectorAll('input[data-sync-group="' + matchGroup + '"]');
                sameGroupInputs.forEach(function(sameGroupInput) {
                    sameGroupInput.parentNode.classList.add('focus');
                    sameGroupInput.value = input.value;
                    inputValid(sameGroupInput);
                });
            });
            
            // Также обрабатываем автозаполнение для синхронизированных полей
            input.addEventListener('change', function() {
                var matchGroup = this.getAttribute('data-sync-group');
                var sameGroupInputs = document.querySelectorAll('input[data-sync-group="' + matchGroup + '"]');
                sameGroupInputs.forEach(function(sameGroupInput) {
                    sameGroupInput.parentNode.classList.add('focus');
                    sameGroupInput.value = input.value;
                    inputValid(sameGroupInput);
                });
            });
        });
    }

    syncInput();
}

function checkInputsMatch() {
    const inputs = document.querySelectorAll('.input-match');

    const matchGroups = {};

    inputs.forEach(input => {
        const groupId = input.getAttribute('data-match-group');
        if (!matchGroups[groupId]) {
            matchGroups[groupId] = [];
        }
        matchGroups[groupId].push(input);
    });
    
    Object.keys(matchGroups).forEach(groupId => {
        const groupInputs = matchGroups[groupId];
        const firstValue = groupInputs[0].value;
        const allMatch = groupInputs.every(input => input.value === firstValue);
        
        groupInputs.forEach(input => {
        if (input.classList.contains('confirm')) {
            // Проверяем, был ли фокус и не пустой ли инпут
            if (!allMatch && input.value !== "") {
            input.parentNode.classList.remove('_ok');
            input.parentNode.classList.add('_error');
            input.classList.remove('_ok');
            input.classList.add('_error');
            } else  {
            input.parentNode.classList.remove('_error');
            input.classList.remove('_error');
            if (input.value !== "") {
                input.parentNode.classList.add('_ok');
                input.classList.add('_ok');
            }
            }
        }
        checkFormUnlock(input.closest('form'))
        });
    });
}

//проверка совпадений инпутов
function inputMatch(){
  const inputs = document.querySelectorAll('.input-match');
  inputs.forEach(input => {
  input.addEventListener('input', checkInputsMatch);
  
  input.addEventListener('focus', function() {
      this.dataset.hadFocus = "true";
  }, {once: true}); 
  });
  

  checkInputsMatch();
}

//добавления класса фокуса 
function focusInput() {
  var textInputs = document.querySelectorAll('input[type="text"], input[type="password"]');

  textInputs.forEach(function(input) {
      if (input.value.trim() !== '') {
          input.parentNode.classList.add('focus');
      }

      input.addEventListener('focus', function() {
          this.parentNode.classList.add('focus');
      });

      input.addEventListener('blur', function() {
          if (this.value.trim() === '') {
              this.parentNode.classList.remove('focus');
          }
      });
  });
}

function popupRightChangeInput() {
    const button = document.querySelector('.popup-right__btn-change-input');

    if (button) {
        const formButton = button.closest('form')
            button.addEventListener('click', function() {
                button.classList.toggle('active-one-text');

                const inputFields = document.querySelectorAll('.popup-right__input-change');

                inputFields.forEach(field => {
                    const input = field.querySelector('input');

                    if (field.classList.contains('active')) {
                        field.classList.remove('active');
                        
                        if (input) {
                            input.classList.remove('_req');
                            input.classList.remove('_error');
                        }
                    } else {
                        field.classList.add('active');
                        if (input) {
                            input.classList.add('_req');
                        }
                    }
                });

                checkFormUnlock(formButton)
            });
    }
}

// Функция для отправки формы без валидации
function sendForm(form) {
    const url = '/wp-content/themes/hanska/static/send.php';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if(!form.classList.contains('unlock')) {
            return;
        }

        console.log('ent')
        form.classList.remove('unlock');
        let formData = new FormData(form);
        

        // Отправка данных без проверки ошибок
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Form was submitted successfully!');
                const popupForm = form.closest('.popup');
                if (popupForm) {
                    const popupFormClose = popupForm.querySelector('.button-close');
                    popupFormClose.click();
                }

                setTimeout(() => {
                    document.querySelector('.popup-thranks__open').click();
                }, 500);
                
                
                // const button = form.querySelector('button');
                const items = form.querySelectorAll('.item-input');
                const inputs = form.querySelectorAll('input');


                items.forEach(item => {
                    item.classList.remove('._ok', '._error');
                });
                inputs.forEach(input => {
                    input.classList.remove('._ok', '._error');
                });
                
                form.reset();
                // const fileItem = form.querySelector('.file-item');
                // if (fileItem) {
                //     fileItem.classList.remove('_selected')
                // }
                

                // setTimeout(() => {
                    // form.classList.remove('_send');
                // }, 5000);

                sendingYandexMetrika()
            } else {
                console.log('An error occurred while submitting the form.');

            }
        })
        .catch(error => {
            console.log('An error occurred while submitting the form:', error);
        });
    });
}

export {
    checkFormUnlock,
    validForm,
    inputMatch,
    focusInput,
    popupRightChangeInput,
    sendForm
}
















//валидация при отправке
// export function validForm(form, popupTranks) {
//     const url = 'static/send.php'
//     document.addEventListener('DOMContentLoaded', () => {
//         form.addEventListener('submit', formSend)
    
//         // функция обработки формы
//         async function formSend(e) { 
//           e.preventDefault()
      
//           let error = formValidate(form)
      
//           let formData = new FormData(form)
      
//             if (error === 0) {
//             //   отправка полученных данных с формы в файл php
//                 fetch(url, {
//                     method: 'POST',
//                     body: formData
//                 })
//                 .then(response => {
//                   if (response.ok) {
//                     // Обработка успешной отправки формы
//                     console.log('Form was submitted successfully!');
//                     popupTranks.classList.add('_is-open')
//                     form.reset()
//                     // sendingYandexMetrika()   
//                   } else {
//                     // Обработка ошибок отправки формы
//                     console.log('An error occurred while submitting the form.');
//                   }
//                 })
//                 .catch(error => {
//                   console.log('An error occurred while submitting the form:', error);
//                 });
                
//             }
//         }
//         const inputFormRecord = form.querySelectorAll('._req') 
//         if (inputFormRecord.length > 0) {
//           inputFormRecord.forEach(input => {
//             input.addEventListener('input', function() {
//               if (input.value.length > 0) {
//                     formRemoveError(input);
//               }
//           });
//           });
//         }
//         function formValidate(popup) {
//           let error = 0;
//           // технический класс который нужно добавиь на те инпуты которые нужно проверять
//           let formReq = form.querySelectorAll('._req')
//           for (let index = 0; index < formReq.length; index++) {
//               const input = formReq[index];
//               //вначале убираем класс error с инпута
//               formRemoveError(input)
      
//               //проверка инпуста с email, нужно добавить класс к инпуту
      
//               if (input.classList.contains('_email')) {
//                   //проверка или email соответствует
//                   if (emailTest(input)) {
//                       //если проверка не прохожит до добавляетм класс ошибки
//                       formAddError(input)
//                       error++
//                   }
//                       //проверяем или является чек боксом
//                       //проверка что это чекбок       проверка что этот чекбокс не влючен
//                   } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
//                       //добавляем к нему класс ошибки 
//                       formAddError(input)
//                       error++
//                   } else if(input.getAttribute("type") === "tel") {
//                     //добавляем к нему класс ошибки 
//                     if(telTest(input)) {
//                       formAddError(input)
//                       error++
//                     }
//                   }
//                    else if (input.value === '' && input.value < 2) {
//                   //проверка всех остальных инпутов заполнены они или нет
//                       formAddError(input)
//                       error++
//                   }
//               }
//               return error
//           }
      
      
//       //функции добавление и удаление класса ошибки
//       function formAddError(input) {
//           input.parentElement.classList.add('_error')
//           input.classList.add('_error')
//       }
//       function formRemoveError(input) {
//           input.parentElement.classList.remove('_error')
//           input.classList.remove('_error')
//       }
//       function emailTest(input) {
//       return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input. value);
//       }
//       function telTest(input) {
//         return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input. value);
//       }
//       })
// }



// function validForm(form) {
//   const inputFormRecord = form.querySelectorAll('._req');

//   inputFormRecord.forEach(input => {
//     inputValid(input)
//     // checkFormUnlock(form);
//     //удаляем классы _error
//     if (inputFormRecord.length > 0) {
//         inputFormRecord.forEach(input => {
//         input.parentElement.classList.remove('_error');
//         input.classList.remove('_error');
//         });
//     }
//     input.addEventListener('input', function () {
//         formRemoveError(input);
//         inputValid(input)
//         checkFormUnlock(form); // Проверка на наличие класса unlock
//     });
//   });
//   function inputValid(input) {
//     if (input.classList.contains('_email')) {
//         if (emailTest(input)) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.getAttribute("type") === "checkbox") {
//         if (input.checked) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.classList.contains('password')) {
//         if (input.value.length >= 8) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.classList.contains('data')) {
//         if (input.value.length >= 10) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.classList.contains('tel')) {
//         if (input.value.length >= 18) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.classList.contains('withdrawal')) {
//         if (input.value.length >= 3) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.classList.contains('password-replay')) {
//         if (input.value === form.querySelector('.password').value) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else if (input.classList.contains('promo-code')) {
//         if (input.value.length >= 4) {
//         formRemoveError(input);
//         } else {
//         formAddError(input);
//         }
//     } else {
//         if (input.value.trim() === '') {
//         formAddError(input);
//         } else {
//         formRemoveError(input);
//         }
//     }

//   }
//   function formAddError(input) {
//     input.parentElement.classList.add('_error');
//     input.classList.add('_error');
//     input.parentElement.classList.remove('_ok');
//     input.classList.remove('_ok');
//   }

//   function formRemoveError(input) {
//     input.parentElement.classList.remove('_error');
//     input.classList.remove('_error');
//     input.parentElement.classList.add('_ok');
//     input.classList.add('_ok');
//   }

//   // function formAddOk(input) {
//   //     input.parentElement.classList.add('_ok');
//   //     input.classList.add('_ok');
//   // }

//   function emailTest(input) {
//     return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value.trim());
//   }

//   function telTest(input) {
//     return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value.trim());
//   }



//   function syncInput() {
//     // Находим все инпуты, имеющие атрибут data-match-group
//     var inputs = document.querySelectorAll('input[data-sync-group]');

//     // Проходим по каждому инпуту
//     inputs.forEach(function(input) {
//         // Добавляем обработчик события на изменение значения инпута
//         input.addEventListener('input', function() {
//             // Получаем значение data-match-group текущего инпута
//             var matchGroup = this.getAttribute('data-sync-group');
//             // Находим все инпуты с таким же значением data-match-group
//             var sameGroupInputs = document.querySelectorAll('input[data-sync-group="' + matchGroup + '"]');
//             // Обновляем значение всех инпутов в группе
//             sameGroupInputs.forEach(function(sameGroupInput) {
//                 sameGroupInput.parentNode.classList.add('focus')
//                 sameGroupInput.value = input.value;
//                 inputValid(sameGroupInput)
//             });
//         });
//     });
//   }
//   syncInput()
// }
