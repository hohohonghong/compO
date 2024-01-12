// 각 건물별 층수 정보
const buildingFloors = {
    '102': 11,
    '103': 4,
    '104': 7,
    '105': 5,
    '201': 4,
    '204': 4,
    '208': 6,
    '301': 10,
    '303': 12,
    '310': ['B6', 'B5', 'B4', 'B3', 'B2', 'B1', '1', '2', '3', '4', '5', '6', '7', '8', '9']
};

//검색
let data = ['103', '102', '310', '편의점', '식당']; // 검색 대상 데이터

document.getElementById('search-input').addEventListener('keyup', function(e) {
    let searchQuery = e.target.value;
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (searchQuery.length > 0) {
        let results = data.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
        results.forEach(item => {
            let div = document.createElement('div');
            div.textContent = item;
            div.addEventListener('click', function() {
                document.getElementById('search-input').value = item;
                resultDiv.innerHTML = '';
            });
            resultDiv.appendChild(div);
        });
    }
});


// 건물 번호 클릭 이벤트
document.querySelectorAll('.building-number').forEach(number => {
    number.addEventListener('click', function() {
        const buildingNumber = number.textContent.trim();
        showFloorSelectModal(buildingNumber);
    });
});

// 층수 선택 모달 표시
function showFloorSelectModal(buildingNumber) {
    const floorSelect = document.getElementById('floor-select');
    floorSelect.innerHTML = '';
    const floors = buildingFloors[buildingNumber];

    (Array.isArray(floors) ? floors : Array.from({ length: floors }, (_, i) => i + 1)).forEach(floor => {
        const option = document.createElement('option');
        option.value = floor;
        option.textContent = isNaN(floor) ? `지하 ${floor.toUpperCase()}층` : `${floor}층`;
        floorSelect.appendChild(option);
    });

    document.querySelector('.floor-select-modal').classList.remove('hidden');
}

// '보기' 버튼 클릭 이벤트
document.getElementById('show-floor').addEventListener('click', function() {
    const floorSelectModal = document.querySelector('.floor-select-modal');
    const buildingNumber = floorSelectModal.dataset.buildingNumber;
    const selectedFloor = document.getElementById('floor-select').value;

    if (selectedFloor) {
        showFloorImageModal(buildingNumber, selectedFloor);
    }
});

// 층 이미지 모달 표시
function showFloorImageModal(buildingNumber, floor) {
    const floorImageModal = document.querySelector('.floor-image-modal');
    const floorImage = document.getElementById('floor-image');
    floorImage.src = `images/${buildingNumber}-${floor}.png`; // 가정한 이미지 경로
    floorImage.alt = `${buildingNumber} 건물 ${floor}층 이미지`;
    floorImageModal.classList.remove('hidden');
}

// 모달 닫기 이벤트
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').classList.add('hidden');
    });
});



// 모달 닫기 이벤트 리스너
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function(event) {
        event.target.closest('.modal').classList.add('hidden');
    });
});

// 메뉴 버튼을 눌렀을 때 사이드바를 보여주는 부분
document.querySelector(".menu-toggle").addEventListener("click", function() {
    document.querySelector(".sidebar").classList.add("open");
});

// 사이드바 외의 다른 곳을 클릭하면 사이드바를 숨기는 부분
window.addEventListener("click", function(event) {
    if (!event.target.matches('.menu-toggle') && !event.target.matches('.sidebar')) {
        document.querySelector(".sidebar").classList.remove("open");
    }
});
// 각 편의시설에 대한 정보
var facilitiesInfo = {
    편의점: '편의점에 대한 정보입니다.',
    식당: '식당에 대한 정보입니다.',
    카페: '카페에 대한 정보입니다.',
    // ... 나머지 편의시설 정보
};

// 모달 창과 모달 창 닫기 버튼
var infoModal = document.getElementById('info-modal');
var closeInfoModalButton = document.querySelector('.close-info-modal');

// 모달 창에 표시될 내용
var modalContent = document.querySelector('.info-modal-content p');

// 모달 창을 보여주는 함수
function openModal() {
    infoModal.style.display = "block";
}

// 모달 창을 숨기는 함수
function closeModal() {
    infoModal.style.display = "none";
}

// 클릭된 편의시설의 정보를 모달 창에 표시하고, 모달 창을 열어주는 함수
function showFacilityInfo(event) {
    var facilityId = event.target.dataset.facility; // 클릭된 편의시설의 ID
    if (facilitiesInfo[facilityId]) {
        modalContent.textContent = facilitiesInfo[facilityId]; // 해당 편의시설 정보를 가져옴
        openModal(); // 모달 창을 염
    }
}

// 모든 편의시설 요소에 클릭 이벤트 핸들러를 추가
var facilityElements = document.querySelectorAll('.facility-button');
facilityElements.forEach(function(facilityElement) {
    facilityElement.addEventListener('click', showFacilityInfo);
});

// 'closeModal' 버튼을 클릭하면 모달을 닫음
closeInfoModalButton.onclick = closeModal;

// 사용자가 모달 바깥을 클릭하면 모달을 닫음
window.onclick = function(event) {
    if (event.target == infoModal) {
        closeModal();
    }
}





