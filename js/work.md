### contextmenu.js <- 오른쪽 클릭 메뉴 추가
### devtools_detection.js <- devtools 감지 추가
 - 기본 감지 방법 추가
    ```javascript
    // 기본 사용
    const detector = new DevToolsDetector();
    detector.init();

    // 콜백 설정하여 사용
    detector.setCallbacks(
        () => { alert('DevTools 열림!'); },
        () => { alert('DevTools 닫힘!'); }
    );
    ```
### Template_Engine.js <- 템플릿 엔진 추가
 - 사용 예제 추가
    ```html 
    <!-- 1. HTML에서 템플릿 정의 -->
    <script id="myTemplate" type="text/template">
        <h1>{{title}}</h1>
        {{#if showContent}}
            <p>{{content}}</p>
        {{/if}}
        <ul>
            {{#each items}}
                <li>{{item}}</li>
            {{/each}}
        </ul>
    </script>

    <!-- 2. 결과를 표시할 컨테이너 -->
    <div id="content"></div>

    <!-- 3. JavaScript에서 사용 -->
    <script>
        const engine = new SimpleTemplate();
        engine.autoRegister();
        
        const data = {
            title: "제목",
            showContent: true,
            content: "내용",
            items: ["항목1", "항목2", "항목3"]
        };
        
        const html = engine.render('myTemplate', data);
        document.getElementById('content').innerHTML = html;
    </script>
    ```


