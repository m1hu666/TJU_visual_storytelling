let carouselInterval; // 用于存储轮播定时器 ID

        function startCarousel() {
            const images = document.querySelectorAll('.carousel-img');
            let currentIndex = 0;

            // 确保初始状态正确
            images.forEach((img, index) => {
                if (index === 0) img.classList.add('active');
                else img.classList.remove('active');
            });

            // 清除可能存在的旧定时器
            if (carouselInterval) clearInterval(carouselInterval);

            carouselInterval = setInterval(() => {
                // 当前图片移除 active
                images[currentIndex].classList.remove('active');
                
                // 计算下一张索引
                currentIndex = (currentIndex + 1) % images.length;
                
                // 下一张图片添加 active
                images[currentIndex].classList.add('active');
            }, 2000); // 每 3 秒切换一次
        }

        function stopCarousel() {
            if (carouselInterval) {
                clearInterval(carouselInterval);
                carouselInterval = null;
            }
        }

        // 显示布局图片
        function showLayout(imageSrc) {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');
            
            // 恢复图片显示
            img.style.display = 'block';
            textContainer.style.display = 'block';

            img.src = imageSrc;
            
            // 根据不同的布局图片，设置不同的文本内容
            if (imageSrc.includes('Earthquake_Simulation_inside')) {
                textContainer.innerHTML = `
                    <h3>地震大装置内部设施</h3>
                    <p>分为实验中心和仿真中心</p>
                    <p>包含地震工程模拟试验装置、高性能计算与智能仿真系统等</p>
                `;
            } else {
                textContainer.innerHTML = '';
                textContainer.style.display = 'none';
            }
            
            container.style.display = 'flex';
        }

        function show9Design() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>设计理念</h3>

                <p>外观主体为红砖外墙，采用中国传统歇山顶、飞鸽形鸱吻、流缸砖清水墙面，对称式布局，线条简洁大气，既有古朴感，又雄伟壮观</p>
            `;
            
            container.style.display = 'flex';
        }

        function show9Time() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>教学楼历史</h3>

                <h4>建成初期</h4>
                <p>第九教学楼建成于1954 年，是天津大学在卫津路校区建校初期的核心基建项目之一。彼时正值新中国成立初期高等教育快速发展阶段，为满足工科教学、实验及办公需求，学校集中建设了一批教学楼，九教是其中规模较大、功能核心的一栋。</p>

                <h4>后续修缮</h4>
                <p>作为卫津路校区 “老牌教学楼”，九教见证了天津大学工科教育的发展历程，曾长期承担机械、材料、化工等核心工科专业的教学任务；历经多次结构加固、内部设施升级，但主体建筑风格和核心功能保持不变，至今仍是老校区教学、科研的重要载体</p>
            `;
            
            container.style.display = 'flex';
        }

        function show9Function() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>教学楼核心功能</h3>

                <h4>教学功能</h4>
                <p>以本科生公共基础课、工科专业基础课为主，涵盖高数、物理、工程制图等课程，阶梯教室可容纳上百人，是全校大型公共课的主要授课地点</p>

                <h4>辅助功能</h4>
                <p>部分楼层设教师办公室、小型科研实验室（以基础实验为主）、自习区，兼具教学、办公、轻科研三重功能</p>
            `;
            
            container.style.display = 'flex';
        }

        function showArchitectureTime() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>建筑历史</h3>

                <h4>建成初期</h4>
                <p>核心主体始建于1952年，是新中国成立后天大首批专为建筑学科定制的教学建筑</p>

                <h4>后续修缮</h4>
                <p>1985年扩建增设实验楼、2001 年扩建增设现代设计工坊</p>

                <h4>建筑现状</h4>
                <p>2010年完成保护性修缮，保留核心结构与风格，升级内部设施，最终形成 “主馆+东配楼+模型工坊” 的复合型空间，总建筑面积约 8000 平方米</p>
            `;
            
            container.style.display = 'flex';
        }

        function showArchitectureLayout() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>功能布局</h3>

                <h4>开放式绘图工坊</h4>
                <p><strong>主馆2~4层</strong>为无隔断大空间绘图室，开间达8米，层高4.5米，配备可调节绘图桌、落地采光窗，保证每个工位都有充足自然光线，适配建筑手绘、方案推敲</p>

                <h4>评图大厅</h4>
                <p><strong>主馆一层核心区域</strong>为评图大厅，墙面是整面磁性白板，可容纳上百人围坐评图。从大一基础课到研究生毕业设计，所有核心方案都在此评审</p>

                <h4>模型工坊</h4>
                <p><strong>地下一层</strong>为专业模型工坊，划分木工区、3D 打印区、材料测试区，配备激光切割机、数控雕刻机等设备，学生可从设计草图直接落地实体模型，实现 “设计-制作-验证” 的闭环</p>

                <h4>阶梯教室与展厅</h4>
                <p><strong>夹层</strong>专设适配设计理论课的小体量阶梯教室、小型展厅等，常年陈列优秀学生设计作品、彭一刚院士等的手稿，成为 “行走的建筑教材”</p>
            `;
            
            container.style.display = 'flex';
        }

        function showArchitectureFunction() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>核心功能</h3>

                <h4>教学</h4>
                <p>承担建筑学、城乡规划、风景园林三个一级学科的核心课程；采用“工作室制”，每个年级和研究方向有专属工作室，师生固定办公学习，形成稳定的教学社群</p>

                <h4>科研</h4>
                <p>馆内设有建筑历史与理论研究所、绿色建筑与节能研究所等6个省部级科研平台，聚焦历史建筑保护、智慧城市、乡村振兴建筑设计等方向</p>

                <h4>交流</h4>
                <p>定期举办国际建筑设计工作坊、“北洋建筑论坛”，是天大建筑学科与MIT、代尔夫特理工等高校交流的核心窗口</p>
            `;
            
            container.style.display = 'flex';
        }

        function showFengjicaiDesign() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>建筑设计</h3>

                <h4>建筑改造</h4>
                <p><strong>原始建筑</strong>为中西合璧的砖木结构小楼（2层主楼+1层附属裙楼），改造后保留了青灰色砖墙、坡屋顶、木质窗棂等核心元素，仅对破损结构做加固，外立面无过度装饰，还原北洋时期校园建筑的素雅风格</p>

                <h4>门廊细节</h4>
                <p><strong>入口处</strong>增设简约的石材门廊，镌刻 “冯骥才文学艺术研究院” 字样，与老建筑风格浑然一体，既醒目又不破坏历史风貌</p>

                <h4>植被点缀</h4>
                <p><strong>建筑外墙</strong>铺满常绿藤蔓植物爬山虎，既美化环境，又起到自然隔热和防护作用，增强建筑的生态功能</p>
            `;
            
            container.style.display = 'flex';
        }

        function showFengjicaiLayout() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>功能布局</h3>

                <h4>非遗文献馆/档案室</h4>
                <p><strong>主楼一层</strong>核心区域为恒温恒湿的文献馆，收藏冯骥才先生捐赠的民间文化手稿、非遗实物、地方民俗档案等，是国内重要的津派文化史料库</p>

                <h4>小型展厅/报告厅</h4>
                <p><strong>裙楼</strong>改造为开放式展厅，定期举办非遗作品展、民俗文化讲座，空间采用灵活隔断，可适配不同规模的展览与交流活动</p>

                <h4>研究工作室/会议室</h4>
                <p><strong>二层</strong>为研究员工作室与研讨室，保留老建筑的木质地板、高窗设计，采光通透，布置中式家具与地方民俗摆件，营造沉浸式的人文研究氛围</p>

                <h4>庭院区域</h4>
                <p>建筑围合出小型内庭院，铺设青石板，种植海棠、石榴等天津本土植物，设置石桌石凳，既是休憩空间，也作为户外小型文化交流的场所</p>
            `;
            
            container.style.display = 'flex';
        }

        function showFengjicaiFunction() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>核心功能</h3>

                <h4>研究</h4>
                <p>聚焦天津地域文化研究、非物质文化遗产保护、传统村落与建筑遗产活化三大方向，依托天大建筑学院的技术优势，实现 “非遗保护 + 建筑规划” 的交叉研究

                <h4>收藏与展示</h4>
                <p>馆藏冯骥才先生个人藏书、手稿超 10 万册 / 件，常年开放小型公益展览，向师生与公众普及津派文化</p>

                <h4>交流与传承</h4>
                <p>定期举办 “北洋人文讲坛”“非遗传承人进校园” 活动，是天大工科学生接触人文艺术、了解地域文化的核心平台</p>
            `;
            
            container.style.display = 'flex';
        }

        function showGateInfo() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>场地使用分类与收费</h3>

                <h4>A 类活动</h4>
                <p><strong>活动性质：</strong>校级重要会议活动</p>

                <h4>B 类活动</h4>
                <p><strong>活动性质：</strong>院处级会议活动</p>

                <h4>C 类活动</h4>
                <p><strong>活动性质：</strong>校企合作会议活动</p>

                <h4>D 类活动</h4>
                <p><strong>活动性质：</strong>社会机构会议活动</p>
            `;
            
            container.style.display = 'flex';
        }

        function showGateDesign() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>场地使用分类与收费</h3>

                <h4>A 类活动</h4>
                <p><strong>活动性质：</strong>校级重要会议活动</p>

                <h4>B 类活动</h4>
                <p><strong>活动性质：</strong>院处级会议活动</p>

                <h4>C 类活动</h4>
                <p><strong>活动性质：</strong>校企合作会议活动</p>

                <h4>D 类活动</h4>
                <p><strong>活动性质：</strong>社会机构会议活动</p>
            `;
            
            container.style.display = 'flex';
        }

        function showGateMeaning() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>场地使用分类与收费</h3>

                <h4>A 类活动</h4>
                <p><strong>活动性质：</strong>校级重要会议活动</p>

                <h4>B 类活动</h4>
                <p><strong>活动性质：</strong>院处级会议活动</p>

                <h4>C 类活动</h4>
                <p><strong>活动性质：</strong>校企合作会议活动</p>

                <h4>D 类活动</h4>
                <p><strong>活动性质：</strong>社会机构会议活动</p>
            `;
            
            container.style.display = 'flex';
        }

        function showMemorialPavilionInfos() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>场地使用分类与收费</h3>

                <h4>A 类活动</h4>
                <p><strong>活动性质：</strong>校级重要会议活动</p>

                <h4>B 类活动</h4>
                <p><strong>活动性质：</strong>院处级会议活动</p>

                <h4>C 类活动</h4>
                <p><strong>活动性质：</strong>校企合作会议活动</p>

                <h4>D 类活动</h4>
                <p><strong>活动性质：</strong>社会机构会议活动</p>
            `;
            
            container.style.display = 'flex';
        }

        function showMemorialPavilionDesign() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>场地使用分类与收费</h3>

                <h4>A 类活动</h4>
                <p><strong>活动性质：</strong>校级重要会议活动</p>

                <h4>B 类活动</h4>
                <p><strong>活动性质：</strong>院处级会议活动</p>

                <h4>C 类活动</h4>
                <p><strong>活动性质：</strong>校企合作会议活动</p>

                <h4>D 类活动</h4>
                <p><strong>活动性质：</strong>社会机构会议活动</p>
            `;
            
            container.style.display = 'flex';
        }
        
        function showMemorialPavilionRelief() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>四角浮雕</h3>

                <h4>东北角</h4>
                <p><strong>天津大学校歌</strong>来源于1934年萧友梅、廖辅叔创作的“北洋大学校歌”，传达了天大人兴学强国的使命、知行合一的精神</p>

                <h4>东南角</h4>
                <p><strong>“钦字第一号”考凭</strong>是北洋大学堂校友王宠惠获得的中国第一张大学毕业文凭，标志着北洋大学作为中国第一所现代大学的悠久历史</p>

                <h4>西北角</h4>
                <p><strong>“实事求是”校训</strong>为茅以升老校长在85周年校庆时亲笔题写，象征着天津大学和天大人的品格</p>

                <h4>西南角</h4>
                <p><strong>北洋大学-天津大学史略</strong>讲述了北洋大学、天津大学的百年办学历程，传达了天津大学的深厚底蕴和历史传承</p>
            `;
            
            container.style.display = 'flex';
        }

        function showTiannanCooperate() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>入驻机构</h3>

                <h4>天津化学化工协同创新中心</h4>
                <p>天津化学化工协同创新中心是天大、南开响应国家 “2011 计划” 共建的国家级协同创新中心，2013 年首批获批，也是化工领域首个国家级协同创新平台。中心依托天大顶尖的化工工程学科、南开优势化学基础学科，以及天津本地化工产业区位优势，聚焦解决化学化工领域重大问题</p>

                <h4>南开大学药学院</h4>
                <p>成立于 2007 年，是南开大学响应国家医药健康产业发展战略、完善学科布局的重要举措。依托南开大学化学、生物学、医学等基础学科的雄厚积淀，学院从成立之初就定位于 “交叉融合、特色鲜明” 的药学人才培养与科研创新基地</p>

                <h4>先进能源材料化学教育部重点实验室</h4>
                <p>先进能源材料化学教育部重点实验室依托南开大学建设，是教育部批准设立的省部级重点实验室，核心依托南开大学化学学院的雄厚基础，聚焦能源材料化学领域的基础研究与应用基础研究，是南开大学在能源科学领域的核心科研平台之一</p>
            `;
            
            container.style.display = 'flex';
        }

        function showTiannanChemistry() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>天津化学化工协同创新中心</h3>

                <p><strong>定位</strong>融合南开大学在化学上的优势、天津大学在化工上的优势，共同建设高水平化学化工研究机构</p>
            `;
            
            container.style.display = 'flex';
        }

        function showTiannanFunction() {
            const container = document.getElementById('layoutViewContainer');
            const img = document.getElementById('layoutImg');
            const textContainer = document.getElementById('layoutText');

            // 隐藏图片，只显示文本
            img.style.display = 'none';
            textContainer.style.display = 'block';

            textContainer.innerHTML = `
                <h3>科研功能</h3>

                <h4>研究方向</h4>
                <p>依托化学化工联合中心、两校各所实验室，主攻绿色化工、高端新材料、能源化工等方向，突破了甲醇制烯烃、CO₂转化等一批 “卡脖子” 技术，成果转化创造显著经济效益，同时培养了大批顶尖化工人才，成为国内化工领域协同创新的标杆</p>
                
                <h4>科研成果</h4>
                <p>研发了甲醇制烯烃MTO成套技术、CO₂捕集与转化利用技术；突破了高性能聚烯烃、特种工程塑料、生物基高分子材料的制备技术；开发了氢能储运、锂电池电解液纯化、生物质制燃料等关键技术；建立了化工过程风险评估体系，研发了高浓度有机废水处理、危化品泄漏应急技术</p>
            `;
            
            container.style.display = 'flex';
        }

        // 隐藏布局图片
        function hideLayout() {
            const container = document.getElementById('layoutViewContainer');
            container.style.display = 'none';
        }

        function triggerMoveUp(type) {
            // 背景上移
            const mapBg = document.querySelector('.map-bg');
            
            // 切换为宽度铺满模式，并使用 object-fit: cover 确保不留空白
            mapBg.style.width = '100%';
            mapBg.style.height = '100vh';
            mapBg.style.objectFit = 'cover';
            mapBg.style.margin = '0';

            mapBg.style.transform = 'translateY(-40%)';
            mapBg.style.clipPath = 'inset(40% 0 25% 0)'; 
            
            // 1. 显示恢复按钮
            document.getElementById('overlay').style.display = 'flex';

            // 2. 处理左下角详情展示 (轮播图 vs 单张图)
            // const carousel = document.getElementById('libraryCarousel');
            const Building_9DetailImg = document.getElementById('Building_9Detail');
            const Building_ArchitectureDetailImg = document.getElementById('Building_ArchitectureDetail');
            const Building_FengjicaiDetailImg = document.getElementById('Building_FengjicaiDetail');
            const Building_TiannanDetailImg = document.getElementById('Building_TiannanDetail');
            const Memorial_pavilionDetailImg = document.getElementById('Memorial_pavilionDetail');
            const GateDetailImg = document.getElementById('GateDetail');
            
            // Info Cards
            const Building9InfoCard = document.getElementById('Building9InfoCard');
            const BuildingArchitectureInfoCard = document.getElementById('BuildingArchitectureInfoCard');
            const BuildingFengjicaiInfoCard = document.getElementById('BuildingFengjicaiInfoCard');
            const BuildingTiannanInfoCard = document.getElementById('BuildingTiannanInfoCard');
            const MemorialPavilionInfoCard = document.getElementById('MemorialPavilionInfoCard');
            const GateInfoCard = document.getElementById('GateInfoCard');

            // 先隐藏所有详情元素
            //carousel.style.display = 'none';
            Building_9DetailImg.style.display = 'none';
            Building_ArchitectureDetailImg.style.display = 'none';
            Building_FengjicaiDetailImg.style.display = 'none';
            Building_TiannanDetailImg.style.display = 'none';
            Memorial_pavilionDetailImg.style.display = 'none';
            GateDetailImg.style.display = 'none';
            
            // 隐藏所有 Info Cards
            //libraryInfoCard.style.display = 'none';
            Building9InfoCard.style.display = 'none';
            BuildingArchitectureInfoCard.style.display = 'none';
            BuildingFengjicaiInfoCard.style.display = 'none';
            BuildingTiannanInfoCard.style.display = 'none';
            MemorialPavilionInfoCard.style.display = 'none';
            GateInfoCard.style.display = 'none';
            
            //stopCarousel();

            // if (type === 'Building_9') {
            //     // 显示图书馆轮播
            //     carousel.style.display = 'grid';
            //     startCarousel();
            //     // 显示图书馆介绍卡片
            //     libraryInfoCard.style.display = 'block';
            // } 
            if (type === 'Building_9') {
                Building_9DetailImg.style.display = 'block';
                Building9InfoCard.style.display = 'block';
            }
            else if (type === 'Building_Architecture') {
                Building_ArchitectureDetailImg.style.display = 'block';
                BuildingArchitectureInfoCard.style.display = 'block';
            } 
            else if (type === 'Building_Fengjicai') {
                Building_FengjicaiDetailImg.style.display = 'block';
                BuildingFengjicaiInfoCard.style.display = 'block';
            } 
            else if (type === 'Building_Tiannan') {
                Building_TiannanDetailImg.style.display = 'block';
                BuildingTiannanInfoCard.style.display = 'block';
            } 
            else if (type === 'Memorial_pavilion') {
                Memorial_pavilionDetailImg.style.display = 'block';
                MemorialPavilionInfoCard.style.display = 'block';
            } 
            else if (type === 'Gate') {
                GateDetailImg.style.display = 'block';
                GateInfoCard.style.display = 'block';
            }

            // 4. 显示底部 Moto 图片 (通用)
            document.getElementById('motoContainer').style.display = 'block';
            
            // 5. 隐藏所有地图图标
            const buildings = document.querySelectorAll('.building-btn');
            buildings.forEach(btn => {
                btn.style.display = 'none';
            });
        }

        function resetView() {
            // 背景恢复
            const mapBg = document.querySelector('.map-bg');
            
            // 恢复宽度固定模式 (100%)
            mapBg.style.width = '100%';
            mapBg.style.height = 'auto';
            mapBg.style.objectFit = ''; // 恢复默认
            mapBg.style.margin = '0'; // 恢复默认 margin

            mapBg.style.transform = 'translateY(0)';
            mapBg.style.clipPath = 'none'; 

            // 1. 隐藏恢复按钮
            document.getElementById('overlay').style.display = 'none';

            // 2. 隐藏左下角详情 (轮播图 和 单张图)
            document.getElementById('libraryCarousel').style.display = 'none';
            document.getElementById('Building_9Detail').style.display = 'none';
            document.getElementById('Building_ArchitectureDetail').style.display = 'none';
            document.getElementById('Building_FengjicaiDetail').style.display = 'none';
            document.getElementById('Building_TiannanDetail').style.display = 'none';
            document.getElementById('Memorial_pavilionDetail').style.display = 'none';
            document.getElementById('GateDetail').style.display = 'none';
            stopCarousel();

            // 3. 隐藏右侧文字介绍卡片
            document.getElementById('Building9InfoCard').style.display = 'none';
            document.getElementById('BuildingArchitectureInfoCard').style.display = 'none';
            document.getElementById('BuildingFengjicaiInfoCard').style.display = 'none';
            document.getElementById('BuildingTiannanInfoCard').style.display = 'none';
            document.getElementById('MemorialPavilionInfoCard').style.display = 'none';
            document.getElementById('GateInfoCard').style.display = 'none';
            
            // 隐藏布局图 (如果打开了)
            hideLayout();

            // 4. 隐藏底部 Moto 图片
            document.getElementById('motoContainer').style.display = 'none';
            
            // 5. 延迟恢复所有地图图标
            setTimeout(() => {
                const buildings = document.querySelectorAll('.building-btn');
                buildings.forEach(btn => {
                    btn.style.display = '';
                });
            }, 500);
        }

        function handleClick(name) {
            console.log("Clicked:", name);
            alert('你点击了：' + name);
        }

        // 你的手动校准参数
        const DESIGN_WIDTH = 10180; 

        window.onload = function() {
            const buildings = document.querySelectorAll('.building-btn');
            buildings.forEach(btn => {
                let pxWidth = btn.getAttribute('data-px-width');
                if (!pxWidth) {
                    pxWidth = parseFloat(btn.style.width);
                }
                if (pxWidth) {
                    const percentWidth = (pxWidth / DESIGN_WIDTH) * 100;
                    btn.style.width = percentWidth + '%';
                }
            });
        };

