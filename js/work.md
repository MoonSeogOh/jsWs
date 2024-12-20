## javascript 관련 샘플 코드

### contextmenu.js <- 오른쪽 클릭 메뉴 추가

### devtools_detection.js <- devtools 감지 추가

 * 기본 감지 방법 추가
    
    ![javascript](https://img.shields.io/badge/javascript-8A2BE2)
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
### jsrender 사용법
     
### js_render/Template_Engine.js <- 템플릿 엔진 추가

 * 사용 예제 추가

    ![HTML](https://img.shields.io/badge/html-ffcfcf)
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
### javascript load script 사용법
  * 사용 예제 추가

    ![javascript](https://img.shields.io/badge/javascript-8A2BE2)
    ``` javascript
    // 모던한 방식으로 스크립트 로드
    async function loadScripts(urls) {
        const loadPromises = urls.map(url => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        });

        try {
            await Promise.all(loadPromises);
            console.log('모든 스크립트 로드 완료');
        } catch (error) {
            console.error('스크립트 로드 중 에러:', error);
            throw error;
        }
    }

    // 사용 예시
    const scripts = [
        'script1.js',
        'script2.js',
        'script3.js'
    ];

    try {
        await loadScripts(scripts);
        // 스크립트 로드 후 실행할 코드
    } catch (error) {
        // 에러 처리
    }
    ```

    ### kakao-sdk-js-sample <- kakao sdk 사용법

     * 사용 예제 추가

        ![html](https://img.shields.io/badge/html-E34F26)
        ```html
            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10d2afdfd1973863610fdfcac8477013&libraries=services,clusterer,drawing"></script>
            <script type="text/javascript">
                const _kakaoMapInfo = {
                     vMap           : null,
                     vMarkerOverlay : null,
                     vZoomControl   : null,
                     cluster        : null

                }
                const kakaoMapInit = function(){
                    let container = document.getElementById("map");
                    let options = {
                        center: new kakao.maps.LatLng(36.6683, 127.6358),
                        level: 12,
                        maxLevel: 12
                    };

                    /* 지도 생성 및 객체 리턴 */
                    _kakaoMapInfo.vMap = new kakao.maps.Map(container, options);

                    /* 마커 내용 표시 오버레이 */
                    _kakaoMapInfo.vMarkerOverlay = new kakao.maps.CustomOverlay();

                    /* 지도 확대 & 축소 */
                    _kakaoMapInfo.vZoomControl = new kakao.maps.ZoomControl();

                    /* 마커 이미지 생성 */

                    let imageSize                      = new kakao.maps.Size(36, 36);		// 마커 이미지 크기
                    let imageMarkerCriticalTempe       = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place1.png",imageSize);
                    let imageMarkerCautionTempe        = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place2.png",imageSize);
                    let imageMarkerAttentionTempe      = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place3.png",imageSize);
                    let imageMarkerOverload            = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place4.png",imageSize);
                    let imageMarkerLeakage             = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place5.png",imageSize);
                    let imageMarkerPowerOutage         = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place6.png",imageSize);
                    let imageMarkerCommunicationError  = new kakao.maps.MarkerImage("/evcs/images/sub/ico_place7.png",imageSize);


                    /* 클러스터러 생성 */
                    _kakaoMapInfo.cluster = new kakao.maps.MarkerClusterer({
                        map: _kakaoMapInfo.vMap,
                        gridSize: 10,
                        averageCenter: true,
                        disableClickZoom : true,
                        minLevel: 1,
                        minClusterSize: 2,
                        styles: [{
                            width: '36px',
                            height: '36px',
                            background: 'url(/evcs/images/sub/ico_place8.png) no-repeat',
                            color: '#5a5a5f',
                            lineHeight: '24px',
                            textAlign: 'center',
                            fontSize: '12px'
                        }]
                    });
                    /* 마커 이미지 생성 */

                };
        ```