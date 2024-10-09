'use strict';

// lấy giá trị

const inputEmail = document.querySelector('.xacnhan');

const email = document.querySelector('#emailxacthuc');

const emaildung = () => {
  return email.textContent.split('').slice(8).join('');
};

const btnCloseModal = document.querySelector('.close');
const btnsOpenModal = document.getElementById('show');
const emailInput = document.getElementById('EmailInput');

const overlay = document.querySelector('.dangnhap');
// tạo event lấy giá trị đầu vào
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const modal = document.querySelector('.thongtinan');
// so sánh email
const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const openModal = function () {
  console.log('Button clicked ' + emailInput.value);
  // kiểm tra đầu vào có phù hợp ko [dùng phương thức regex.test(từ giá trị đầu vào)]
  if (regex.test(emailInput.value)) {
    // nếu đúng
    if (emailInput.value === emaildung()) {
      console.log('true' + emailInput.value + ' ' + emaildung());
      modal.classList.remove('hidden');
      overlay.classList.add('hidden');
      emailInput.value = '';
      //   btnsOpenModal[i].addEventListener('click', () => {});
      btnCloseModal.addEventListener('click', closeModal);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
          displayMessage('Hãy nhập email để xác thực');
        }
      });

      // nếu sai
    } else {
      modal.classList.add('hidden');
      overlay.classList.remove('hidden');
      console.log('false' + emailInput.value + ' ' + emaildung());

      displayMessage('Email không đúng . Vui lòng nhập lại ');
      document.querySelector('.message').style.color = '#f00';
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });
      emailInput.addEventListener('keydown', function (e) {
        console.log(e.key);
        if (e.key) {
          closeModal();
        }
      });
    }
  } else {
    displayMessage('Cấu trúc ko đúng . Vui lòng nhập lại ');
    document.querySelector('.message').style.color = '#f00';
    emailInput.addEventListener('keydown', function (e) {
      console.log(e.key);
      if (e.key) {
        closeModal();
      }
    });
  }
};
// đóng
const closeModal = function () {
  displayMessage('Hãy nhập email để xác thực');
  document.querySelector('.message').style.color = '#000';
  modal.classList.add('hidden');
  overlay.classList.remove('hidden');
};

// nút mở
btnsOpenModal.addEventListener('click', openModal);

// II.Chức năng ẩn thông tin nghề nghiệp

let checkedClick = [];

//1.Tạo chức năng ẩn hiện nút VIEW MORE

// Xác định các phần sẽ dùng

const sections = document.querySelectorAll('.section');
const seeMoreButton = document.querySelectorAll('.open1');
const viewLessButton = document.querySelectorAll('.close1');

// trả về mảng [ chứa tất cả các phần tử có tên class section ]

// Lặp qua từng phần
sections.forEach((section, index) => {
  // Thêm trình nghe sự kiện di chuột qua

  section.addEventListener('mouseover', () => {
    // Xác định nút mở
    const seeMoreButton = section.querySelector('.open1');

    // Mục đích tạo điều kiện if là để kiểm tra xem
    // khung nào đã hiển thị full thông tin rồi
    // thì khi di chuột vào lại khung đó
    // nút VIEW MORE sẽ không xuất hiện nữa

    if (checkedClick.includes(index)) {
      seeMoreButton.style.display = 'none';
    } else {
      seeMoreButton.style.display = 'block';
    }
  });

  // Thêm trình xử lý sự kiện mouseout
  // khi di chuyển chuột ra ngoài
  // thì ẩn nút VIEW MORE đi
  section.addEventListener('mouseout', () => {
    const seeMoreButton = section.querySelector('.open1');
    seeMoreButton.style.display = 'none';
  });
});

// 2/ Tạo event cho 2 nút VIEW MORE , VIEW LESS

// Tạo hành động cho nút VIEW MORE
seeMoreButton.forEach((section, index) => {
  section.addEventListener('click', () => {
    // Khi ấn vào nút VIEW MORE thì sẽ ẩn nút đi
    seeMoreButton[index].style.display = 'none';

    // Gộp 6 phần tử lại với nhau
    const showEL = document.querySelectorAll('.timeline');
    const showPointEL = document.querySelectorAll('.point');
    const groupEL = [...showEL, ...showPointEL];

    // Gía trị index giúp xác định chính xác
    // phần tử đó được mở lên
    groupEL[index].classList.remove('hidden1');

    // lưu lại phần tử đã mở vào mảng checkedClick
    checkedClick.push(index);
  });
});

// Tạo hành động cho nút VIEW LESS
viewLessButton.forEach((section, index) => {
  section.addEventListener('click', () => {
    // Gộp 6 phần tử lại với nhau
    const showEL = document.querySelectorAll('.timeline');
    const showPointEL = document.querySelectorAll('.point');
    const groupEL = [...showEL, ...showPointEL];

    // Gía trị index giúp xác định chính xác
    // phần tử đó được tắt đi
    groupEL[index].classList.add('hidden1');

    // Lọc ra các phẩn tử đã bị tắt đi
    // để cho phép nút VIEW MORE được mở trở lại
    const updateArr = checkedClick.filter(items => {
      return items !== index;
    });

    // Lưu updateArr vào cho mảng CheckedClick
    checkedClick = updateArr;
  });

  
});
