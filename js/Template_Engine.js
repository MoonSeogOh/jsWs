// 간단한 템플릿 엔진 클래스
class SimpleTemplate {
    constructor() {
        this.templates = new Map();
    }

    // 템플릿 등록
    registerTemplate(templateId, templateElement) {
        if (typeof templateElement === 'string') {
            this.templates.set(templateId, templateElement);
        } else if (templateElement instanceof HTMLElement) {
            this.templates.set(templateId, templateElement.innerHTML);
        }
    }

    // 모든 스크립트 템플릿 자동 등록
    autoRegister() {
        document.querySelectorAll('script[type="text/template"]').forEach(template => {
            if (template.id) {
                this.registerTemplate(template.id, template);
            }
        });
    }

    // 템플릿 렌더링
    render(templateId, data) {
        let template = this.templates.get(templateId);
        if (!template) return '';

        // 반복문 처리 ({{#each items}} content {{/each}})
        template = this._handleLoops(template, data);
        
        // 조건문 처리 ({{#if condition}} content {{/if}})
        template = this._handleConditions(template, data);
        
        // 변수 치환 ({{variable}})
        return this._replaceVariables(template, data);
    }

    // 반복문 처리
    _handleLoops(template, data) {
        const loopRegex = /{{#each\s+(\w+)}}([\s\S]*?){{\/each}}/g;
        
        return template.replace(loopRegex, (match, key, content) => {
            const items = data[key];
            if (!Array.isArray(items)) return '';
            
            return items.map(item => {
                return this._replaceVariables(content, {
                    ...data,
                    item: item
                });
            }).join('');
        });
    }

    // 조건문 처리
    _handleConditions(template, data) {
        const conditionRegex = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;
        
        return template.replace(conditionRegex, (match, condition, content) => {
            return data[condition] ? this._replaceVariables(content, data) : '';
        });
    }

    // 변수 치환
    _replaceVariables(template, data) {
        return template.replace(/{{(\w+)}}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : match;
        });
    }
}

// 사용 예제
document.addEventListener('DOMContentLoaded', () => {
    // 템플릿 엔진 인스턴스 생성
    const templateEngine = new SimpleTemplate();

    // HTML에서 템플릿 정의
    const templateHTML = `
        <script id="userTemplate" type="text/template">
            <div class="user-card">
                <h3>{{name}}</h3>
                {{#if isAdmin}}
                    <span class="badge">관리자</span>
                {{/if}}
                <div class="details">
                    <p>이메일: {{email}}</p>
                    {{#each skills}}
                        <span class="skill">{{item}}</span>
                    {{/each}}
                </div>
            </div>
        </script>
    `;
    document.body.insertAdjacentHTML('beforeend', templateHTML);

    // 템플릿 자동 등록
    templateEngine.autoRegister();

    // 데이터 정의
    const userData = {
        name: "홍길동",
        email: "hong@example.com",
        isAdmin: true,
        skills: ["JavaScript", "HTML", "CSS"]
    };

    // 템플릿 렌더링
    const rendered = templateEngine.render('userTemplate', userData);
    document.getElementById('content').innerHTML = rendered;
});

// 실제 사용 예제
class UserList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.templateEngine = new SimpleTemplate();
        this.init();
    }

    init() {
        // 템플릿 정의
        const template = `
            <div class="user-list">
                {{#each users}}
                    <div class="user-item">
                        <h4>{{item.name}}</h4>
                        {{#if item.isActive}}
                            <span class="status active">활성</span>
                        {{/if}}
                        <div class="user-info">
                            <p>{{item.email}}</p>
                            <p>가입일: {{item.joinDate}}</p>
                        </div>
                    </div>
                {{/each}}
            </div>
        `;
        
        this.templateEngine.registerTemplate('userList', template);
    }

    render(users) {
        const rendered = this.templateEngine.render('userList', { users });
        this.container.innerHTML = rendered;
    }

    // 사용자 추가
    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        this.render(users);
    }

    // 현재 사용자 목록 가져오기
    getUsers() {
        // 실제로는 서버나 로컬 스토리지에서 가져올 수 있음
        return [
            {
                name: "홍길동",
                email: "hong@example.com",
                isActive: true,
                joinDate: "2024-03-19"
            },
            {
                name: "김철수",
                email: "kim@example.com",
                isActive: false,
                joinDate: "2024-03-18"
            }
        ];
    }
}

// 사용 방법
const userList = new UserList('userContainer');
userList.render(userList.getUsers());