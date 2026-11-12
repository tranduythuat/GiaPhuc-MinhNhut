(function () {
    "use strict";

    var SUPPORTED_LANGS = ["vi", "en"];
    var DEFAULT_LANG = "vi";

    /* =========================================================
     * Translation dictionary
     * Keys map to data-i18n / data-i18n-placeholder attributes.
     * Values can contain simple HTML (span/br/strong) since some
     * source strings already include inline markup.
     * ========================================================= */
    var translations = {
        vi: {
            "invite_message.p1": "Dear our beloved friend 🤍,<br> Thân mời bạn đến chung vui cùng tụi mình <br> trong buổi tiệc mừng ngày hai đứa chính thức <br> về chung một nhà. 💍",
            "invite_message.p2": "Sự hiện diện của bạn là niềm vui và món quà ý nghĩa <br> nhất dành cho tụi mình trong dịp đặc biệt này.♡",
            "invite_message.p3": "Mong được đón bạn đến chung vui!",
            "invite_message.p4": "With all our love,<br> Gia Phúc & Minh Nhựt 🤍",
            "invite_label_location": "Tại",
            "invite_location": "Nhà hàng <br> Maison De Charme",
            "invite_location_address": "793/57/16 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, TP. HCM",
            "invite.mapButton": 'CLICK ĐỂ XEM BẢN ĐỒ',

            "timeline.item1": '<div><span class="bold">17:30</span>&nbsp;- ĐÓN KHÁCH</div>',
            "timeline.item2": '<div><span class="bold">18:30</span>&nbsp;- LÀM LỄ</div>',
            "timeline.item3": '<div><span class="bold">19:00</span>&nbsp;- KHAI TIỆC</div>',
            "timeline.item4": '<div><span class="bold">21:00</span>&nbsp;- AFTER PARTY</div>',

            "rsvp.title": "Xác nhận tham dự",
            "rsvp.subtitle":
                'Rất mong nhận được sự xác nhận tham dự <br> của bạn <strong>trước ngày 1/12/2026</strong> để chúng mình <br> có thể chuẩn bị chu đáo nhất.',
            "rsvp.nameSubtitle": "1. Tên của bạn?",
            "rsvp.namePlaceholder": 'Tên khách mời',
            "rsvp.phonePlaceholder": "SĐT",
            "rsvp.guestNumberSubtitle": '3. Số lượng người tham dự (Bao gồm bạn)',

            "rsvp.guest_01": "1 NGƯỜI",
            "rsvp.guest_02": "2 NGƯỜI",
            "rsvp.guest_03": "3 NGƯỜI",
            "rsvp.otherPlaceholder": "Khác",

            "rsvp.confirmRelatedSubtitle": 'Quý Khách là người thân, bạn bè,<br> đồng nghiệp của gia đình ... ?',
            "rsvp.confirmSubtitle": '2. Bạn có thể đến chung vui cùng chúng mình không?',
            "rsvp.yes": 'Chắc chắn tham dự',
            "rsvp.no": 'Rất tiếc không thể tham dự',
            "rsvp.guestsSubtitle": 'BẠN CÓ “TỆP ĐÍNH KÈM” CÙNG TỚI TIỆC CƯỚI KHÔNG? <br />',
            "rsvp.alone": 'Chỉ có tôi và sự cô đơn',
            "rsvp.child": 'Tôi đi cùng trẻ nhỏ',
            "rsvp.related_subtitle": "Quý khách có yêu cầu đặc biệt về thức ăn không?",
            "rsvp.regular_menu": "Số lượng khách dùng tiệc mặn",
            "rsvp.vegetarian_menu": "Số lượng khách dùng tiệc chay",
            "rsvp.normal": "Ăn mặn",
            "rsvp.vegetarian": "Ăn chay",
            "rsvp.messageSubtitle": 'GỬI MỘT VÀI LỜI IU THƯƠNG DÀNH CHO CHÚNG MÌNH NHA ^^',
            "rsvp.messagePlaceholder": 'Quý khách có lời chúc hay nhắn gửi đến cô dâu và chú rể không?',
            "rsvp.submit": 'Xác nhận',

            "yenstudio.textMain": 'HẸN GẶP LẠI BẠN!',
            "quick_actions.map": 'Bản đồ',
            "quick_actions.rsvp": 'Phản hồi'
        },
        en: {
            "invite_message.p1": "Dear our beloved friend,<br> We’ve officially tied the knot and would love for you <br>to join us on the celebration of our beautiful<br> new chapter together. 💍",
            "invite_message.p2": "Having you there to share our happiness <br> would mean so much to us. ♡",
            "invite_message.p3": "Can’t wait to celebrate with you!",
            "invite_message.p4": "With all our love,<br> Gia Phúc & Minh Nhựt 🤍",

            "invite_label_location": "At",
            "invite_location": "Maison De Charme <br> Wedding & Convention",
            "invite_location_address": "793/57/16 Tran Xuan Soan Street, Tan Hung Ward, <br> District 7, Ho Chi Minh City",

            "invite.mapButton": 'CLICK TO VIEW MAP',

            "timeline.item1": '<div><span class="bold">17:30</span>&nbsp;- WELCOMING</div>',
            "timeline.item2": '<div><span class="bold">18:30</span>&nbsp;- WEDDING CEREMONY</div>',
            "timeline.item3": '<div><span class="bold">19:00</span>&nbsp;- DINNER</div>',
            "timeline.item4": '<div><span class="bold">21:00</span>&nbsp;- AFTER PARTY</div>',

            "rsvp.title": "Attendance <br>Confirmation",
            "rsvp.subtitle": "Please kindly RSVP <strong>by December 1, 2026</strong>, to help us <br> prepare for your presence on our special day",
            "rsvp.nameSubtitle": "1. WHAT’S YOUR NAME?",
            "rsvp.namePlaceholder": "Your Name",
            "rsvp.phonePlaceholder": "Phone Number",
            "rsvp.guestNumberSubtitle": "3. Number Of Guests (Including Yourself)",
            "rsvp.guest_01": "1 GUEST",
            "rsvp.guest_02": "2 GUESTS",
            "rsvp.guest_03": "3 GUESTS",
            "rsvp.otherPlaceholder": "Other",

            "rsvp.confirmRelatedSubtitle": "Which side are you invited by?",
            "rsvp.phucConfirmRelated": "Elias",
            "rsvp.ngocConfirmRelated": "Jade",
            "rsvp.confirmSubtitle": "2. WILL YOU BE ATTENDING OUR WEDDING?",
            "rsvp.yes": "YES, OF COURSE",
            "rsvp.no": "SORRY, I CANNOT ATTEND",
            "rsvp.guestsSubtitle": "WILL YOU BE BRINGING A PLUS-ONE? <br />",
            "rsvp.alone": "Just Me, Myself & I",
            "rsvp.child": "I'll Bring My Little One",
            "rsvp.related_subtitle": "Do you have any special dietary requirements?",
            "rsvp.regular_menu": "Number of Guests for the Regular Menu",
            "rsvp.vegetarian_menu": "Number of Guests for the Vegetarian Menu",
            "rsvp.normal": "Regular Meal",
            "rsvp.vegetarian": "Vegetarian Meal",
            "rsvp.messageSubtitle": "SEND US SOME LOVE ^^",
            "rsvp.messagePlaceholder": "Any wishes or messages for the happy couple?",
            "rsvp.submit": "Confirm RSVP",
            "yenstudio.textMain": "SEE YOU THERE!",
            "quick_actions.map": "Map",
            "quick_actions.rsvp": "RSVP"
        }
    };

    var switcherLabels = { vi: "English", en: "Tiếng Việt" };

    function isSupported(lang) {
        return SUPPORTED_LANGS.indexOf(lang) !== -1;
    }

    function getLangFromURL() {
        var params = new URLSearchParams(window.location.search);
        var lang = params.get("lang");
        return isSupported(lang) ? lang : null;
    }

    function updateURL(lang) {
        try {
            var url = new URL(window.location.href);
            url.searchParams.set("lang", lang);
            window.history.replaceState({}, "", url.toString());
        } catch (e) {
            /* ignore for very old browsers */
        }
    }

    function applyTranslations(lang) {
        var dict = translations[lang] || translations[DEFAULT_LANG];

        document.documentElement.setAttribute("lang", lang);

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            if (dict[key] !== undefined) {
                el.setAttribute("placeholder", dict[key]);
            }
        });

        var switcher = document.getElementById("langSwitcher");
        if (switcher) {
            switcher.textContent = switcherLabels[lang] || switcherLabels[DEFAULT_LANG];
            switcher.setAttribute("data-current-lang", lang);
        }
    }

    function hidePopup() {
        var overlay = document.getElementById("langOverlay");
        if (overlay) {
            overlay.classList.remove("is-visible");
        }
    }

    function showPopup() {
        var overlay = document.getElementById("langOverlay");
        if (overlay) {
            overlay.classList.add("is-visible");
        }
    }

    function selectLang(lang, options) {
        if (!isSupported(lang)) return;
        var opts = options || {};

        applyTranslations(lang);
        updateURL(lang);
        hidePopup();

        if (!opts.silent) {
            document.dispatchEvent(
                new CustomEvent("langchange", { detail: { lang: lang } })
            );
        }
    }

    function initPopupButtons() {
        document.querySelectorAll(".lang-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                selectLang(btn.getAttribute("data-lang"));
            });
        });
    }

    function initSwitcher() {
        var switcher = document.getElementById("langSwitcher");
        if (!switcher) return;
        switcher.addEventListener("click", function () {
            var current = switcher.getAttribute("data-current-lang") || DEFAULT_LANG;
            var next = current === "vi" ? "en" : "vi";
            selectLang(next);
        });
    }

    function init() {
        initPopupButtons();
        initSwitcher();

        var urlLang = getLangFromURL();

        if (urlLang) {
            // Language is chosen via URL param; no popup needed.
            applyTranslations(urlLang);
        } else {
            // No lang param: show the language picker so the visitor can choose.
            applyTranslations(DEFAULT_LANG);
            showPopup();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
