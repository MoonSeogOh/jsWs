// DOM 이벤트를 모니터링하고 컨텍스트 메뉴를 커스터마이징하는 프로그램
class DOMEventMonitor {
    constructor() {
        this.eventLogs = [];
        this.MAX_LOGS = 10;
        this.contextMenu = null;
        this.selectedElement = null;
        this.init();
    }

    init() {
        this.createStyles();
        this.createEventList();
        this.setupEventListeners();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #_customMenu {
                position: fixed;
                background: white;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                padding: 8px 0;
                z-index: 1000;
                min-width: 200px;
            }
            #_customMenu ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            #_customMenu li {
                padding: 8px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #_customMenu li:hover {
                background-color: #f0f0f0;
            }
            #_customMenu li.separator {
                border-bottom: 1px solid #eee;
                margin: 4px 0;
                padding: 0;
            }
            .event-list {
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                border-radius: 4px;
                max-height: 300px;
                overflow-y: auto;
            }
            .menu-icon {
                width: 16px;
                height: 16px;
                display: inline-block;
            }
        `;
        document.head.appendChild(style);
    }

    createEventList() {
        const eventList = document.createElement('div');
        eventList.className = 'event-list';
        document.body.appendChild(eventList);
        this.eventList = eventList;
    }

    setupEventListeners() {
        const eventTypes = [
            'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseup',
            'mouseover', 'mouseout', 'mousemove', 'keydown', 'keyup',
            'focus', 'blur', 'input', 'change', 'submit'
        ];

        eventTypes.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                this.updateEventLog(eventType, e.target);
            }, true);
        });

        document.addEventListener('contextmenu', (e) =>{
			if ( e.ctrlKey ) {
				// this.handleContextMenu.bind(this);
				e.preventDefault();
				this.selectedElement = e.target;
				this.createContextMenu(e.clientX,e.clientY);	
			}
			
		});
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    updateEventLog(eventType, target) {
        const time = new Date().toLocaleTimeString();
        const elementInfo = target.tagName.toLowerCase() +
            (target.id ? `#${target.id}` : '') +
            (target.className ? `.${target.className.split(' ').join('.')}` : '');
        
        this.eventLogs.unshift(`${time} - ${eventType} on ${elementInfo}`);
        if (this.eventLogs.length > this.MAX_LOGS) {
            this.eventLogs.pop();
        }

        this.eventList.innerHTML = `<h3>최근 이벤트</h3>` +
            this.eventLogs.map(log => `<div>${log}</div>`).join('');
    }

    // 컨텍스트 메뉴 관련 기능들
    handleContextMenu(e) {
        e.preventDefault();
        this.selectedElement = e.target;
        this.createContextMenu(e.clientX, e.clientY);
    }

    handleDocumentClick(e) {
        if (this.contextMenu && !this.contextMenu.contains(e.target)) {
            this.contextMenu.remove();
            this.contextMenu = null;
        }
    }

    createContextMenu(x, y) {
        if (this.contextMenu) {
            this.contextMenu.remove();
        }

        const menuContainer = document.createElement('div');
        menuContainer.id = '_customMenu';
        
        const menuItems = this.createMenuItems();
        menuContainer.appendChild(menuItems);

        menuContainer.style.left = `${x}px`;
        menuContainer.style.top = `${y}px`;
        
        document.body.appendChild(menuContainer);
        this.contextMenu = menuContainer;
    }

    createMenuItems() {
        const ul = document.createElement('ul');
        
        const menuConfig = [
            { 
                icon: '🔍', 
                text: '요소 정보 보기', 
                handler: () => this.showElementInfo() 
            },
            { 
                icon: '📋', 
                text: '요소 복사', 
                handler: () => this.copyElement() 
            },
            { 
                type: 'separator' 
            },
            { 
                icon: '🎨', 
                text: '스타일 수정', 
                handler: () => this.editStyles() 
            },
            { 
                icon: '✏️', 
                text: '텍스트 수정', 
                handler: () => this.editText() 
            },
            { 
                icon: '🗑️', 
                text: '요소 삭제', 
                handler: () => this.deleteElement() 
            }
        ];

        menuConfig.forEach(item => {
            if (item.type === 'separator') {
                const separator = document.createElement('li');
                separator.className = 'separator';
                ul.appendChild(separator);
                return;
            }

            const li = document.createElement('li');
            li.innerHTML = `<span class="menu-icon">${item.icon}</span>${item.text}`;
            li.addEventListener('click', () => {
                item.handler();
                this.contextMenu.remove();
            });
            ul.appendChild(li);
        });

        return ul;
    }

    // 메뉴 아이템 핸들러 함수들
    showElementInfo() {
        const info = {
            tagName: this.selectedElement.tagName.toLowerCase(),
            id: this.selectedElement.id,
            classes: Array.from(this.selectedElement.classList),
            attributes: Array.from(this.selectedElement.attributes)
                .map(attr => `${attr.name}="${attr.value}"`),
            styles: window.getComputedStyle(this.selectedElement)
        };

        console.log('요소 정보:', info);
		let message = `
            태그: ${info.tagName}
            ID: ${info.id || '없음'}
            클래스: ${info.classes.join(', ') || '없음'}
            속성: ${info.attributes.join(', ') || '없음'}
        `;
//		alert(message);
    }

    copyElement() {
        const elementHTML = this.selectedElement.outerHTML;
        navigator.clipboard.writeText(elementHTML)
            .then(() => alert('요소가 클립보드에 복사되었습니다.'))
            .catch(err => console.error('복사 실패:', err));
    }

    editStyles() {
        const currentStyle = window.getComputedStyle(this.selectedElement);
        const newStyle = prompt('수정할 스타일을 입력하세요 (예: color: red; background: blue;)', 
            this.selectedElement.getAttribute('style'));
        
        if (newStyle !== null) {
            this.selectedElement.setAttribute('style', newStyle);
        }
    }

    editText() {
        if (this.selectedElement.firstChild?.nodeType === Node.TEXT_NODE) {
            const newText = prompt('새로운 텍스트를 입력하세요:', this.selectedElement.textContent);
            if (newText !== null) {
                this.selectedElement.textContent = newText;
            }
        } else {
            alert('텍스트 노드가 없는 요소입니다.');
        }
    }

    deleteElement() {
        if (confirm('이 요소를 삭제하시겠습니까?')) {
            this.selectedElement.remove();
        }
    }
}

// 인스턴스 생성 및 초기화
document.addEventListener('DOMContentLoaded', () => {
	// 기본 인스턴스 생성
	window.domEventMonitor = new DOMEventMonitor();
});