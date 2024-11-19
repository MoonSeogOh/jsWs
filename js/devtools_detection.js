class DevToolsDetector {
    constructor() {
        this.isOpen = false;
        this.callbacks = {
            onOpen: () => console.log('DevTools opened'),
            onClose: () => console.log('DevTools closed')
        };
    }

    // 콜백 설정
    setCallbacks(onOpen, onClose) {
        this.callbacks.onOpen = onOpen || this.callbacks.onOpen;
        this.callbacks.onClose = onClose || this.callbacks.onClose;
    }

    // 모든 감지 방법 실행
    init() {
        this.detectDevToolsByConsole();
        this.detectDevToolsByDimensions();
        this.detectDevToolsByDebugger();
        this.detectDevToolsByElement();
    }

    // 1. console.log 출력 크기 차이를 이용한 감지
    detectDevToolsByConsole() {
        const checkConsole = () => {
            const startTime = new Date();
            console.log('DevTools detection');
            console.clear();
            const endTime = new Date();
            const timeDiff = endTime - startTime;

            // console.log 실행 시간이 100ms 이상이면 DevTools가 열려있다고 판단
            if (timeDiff > 100) {
                this.handleDevToolsChange(true);
            } else {
                this.handleDevToolsChange(false);
            }
        };

        setInterval(checkConsole, 1000);
    }

    // 2. 창 크기 차이를 이용한 감지
    detectDevToolsByDimensions() {
        const checkDimensions = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;

            // 창 크기 차이가 임계값을 초과하면 DevTools가 열려있다고 판단
            if (widthThreshold || heightThreshold) {
                this.handleDevToolsChange(true);
            } else {
                this.handleDevToolsChange(false);
            }
        };

        window.addEventListener('resize', checkDimensions);
        setInterval(checkDimensions, 1000);
    }

    // 3. debugger 명령어를 이용한 감지
    detectDevToolsByDebugger() {
        const element = new Image();
        
        Object.defineProperty(element, 'id', {
            get: function() {
                this.handleDevToolsChange(true);
                return '';
            }.bind(this)
        });

        setInterval(() => {
            console.debug(element);
            console.clear();
        }, 1000);
    }

    // 4. DOM 요소 변경 감지를 통한 방법
    detectDevToolsByElement() {
        let devtools = document.createElement('div');
        Object.defineProperty(devtools, 'innerHTML', {
            get: function() {
                this.handleDevToolsChange(true);
                return '';
            }.bind(this)
        });

        setInterval(() => {
            devtools = devtools;
            console.clear();
        }, 1000);
    }

    // DevTools 상태 변경 처리
    handleDevToolsChange(isOpen) {
        if (this.isOpen !== isOpen) {
            this.isOpen = isOpen;
            if (isOpen) {
                this.callbacks.onOpen();
            } else {
                this.callbacks.onClose();
            }
        }
    }

    // 현재 상태 확인
    isDevToolsOpen() {
        return this.isOpen;
    }
}

// 사용 예제
const detector = new DevToolsDetector();

// 콜백 설정
detector.setCallbacks(
    () => {
        console.log('DevTools가 열렸습니다!');
        // 여기에 DevTools가 열렸을 때 실행할 코드 작성
    },
    () => {
        console.log('DevTools가 닫혔습니다!');
        // 여기에 DevTools가 닫혔을 때 실행할 코드 작성
    }
);

// 감지 시작
detector.init();

// 상태 확인
setInterval(() => {
    const status = detector.isDevToolsOpen() ? '열림' : '닫힘';
    console.log(`현재 DevTools 상태: ${status}`);
}, 2000);