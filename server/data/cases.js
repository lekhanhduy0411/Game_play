export const casesData = [
  // =========================================================================
  // CHƯƠNG 1 // LOCALHOST — ĐÊM MẤT TÍCH Ở TẦNG 4
  // =========================================================================
  {
    order: 1,
    slug: "case-01",
    chapter: "CHƯƠNG 1 // LOCALHOST",
    chapterNumber: 1,
    title: "Chiếc Điện Thoại Bỏ Quên",
    difficulty: "Dễ",
    timeLimit: null,
    speaker: "SYSTEM",
    dialogue:
      "Gói tin đầu tiên dẫn tới chiếc điện thoại dự phòng mà kỹ sư Hoàng Nam — trợ lý của TS. Khôi — cố tình để lại trong tủ đồ trước khi bị đội an ninh áp giải.",
    victoryNote:
      "Thiết bị đã mở khóa! Nhật ký cuộc gọi đêm qua xác nhận Khánh Vy đã cố cảnh báo về một mã truy cập tạm thời phát sinh lúc nửa đêm ở tầng 4.",
    visualType: "PHONE_LOCK",
    briefing:
      "Tìm mật khẩu 4 chữ số mở khóa điện thoại của kỹ sư Hoàng Nam từ 3 tệp dữ liệu.",
    answer: "1289",
    inputPlaceholder: "4 chữ số...",
    documents: [
      {
        id: "doc-01-1",
        title: "Ghi chú nháp",
        docType: "NOTE",
        meta: "draft_pin.txt // Tủ đồ cá nhân #402",
        content:
          "Ghép [2 số ngày sinh của mẹ] + [2 số cuối mã NV]. Tuyệt đối không ghi ra giấy.",
        isClue: true,
        segments: [
          {
            id: "c01-d1-s1",
            text: "[NHẬT KÝ BẢO MẬT CÁ NHÂN — HOÀNG NAM]",
            isClue: false,
          },
          {
            id: "c01-d1-s2",
            text: "Đổi mã PIN mới: Ghép [2 số ngày sinh của mẹ] + [2 số cuối mã NV]. Tuyệt đối không ghi ra giấy.",
            isClue: true,
            clueLabel: "Công thức PIN: [2 số ngày sinh mẹ] + [2 số cuối mã NV]",
          },
          {
            id: "c01-d1-s3",
            text: "Lưu ý: Tắt tự động đồng bộ lên máy chủ AetherCorp trước 23:00.",
            isClue: false,
          },
        ],
      },
      {
        id: "doc-01-2",
        title: "Tin nhắn",
        docType: "MESSAGE",
        meta: "SMS Backup // Kênh Gia Đình",
        content:
          "Nam: Chúc mừng sinh nhật mẹ yêu (12/05)! Cuối tuần con trực xong sẽ về ăn cơm.",
        isClue: true,
        segments: [
          {
            id: "c01-d2-s1",
            text: "Mẹ: Hôm nay con có phải trực ca đêm ở Phòng Lab nữa không?",
            isClue: false,
          },
          {
            id: "c01-d2-s2",
            text: "Nam: Chúc mừng sinh nhật mẹ yêu (12/05)! Cuối tuần con trực xong sẽ về ăn cơm.",
            isClue: true,
            clueLabel: "Ngày sinh của mẹ: 12 (trong 12/05)",
          },
          {
            id: "c01-d2-s3",
            text: "Mẹ: Nhớ giữ gìn sức khỏe nhé con trai.",
            isClue: false,
          },
        ],
      },
      {
        id: "doc-01-3",
        title: "Thẻ Nhân Sự",
        docType: "ID_CARD",
        meta: "AetherCorp HR Registry // Tầng 4",
        content: "Nguyễn Hoàng Nam — Mã NV: DEV-4089",
        isClue: true,
        segments: [
          {
            id: "c01-d3-s1",
            text: "TẬP ĐOÀN CÔNG NGHỆ AETHERCORP — NEO-SAIGON",
            isClue: false,
          },
          {
            id: "c01-d3-s2",
            text: "Nguyễn Hoàng Nam — Mã NV: DEV-4089",
            isClue: true,
            clueLabel: "Mã NV: DEV-4089 (2 số cuối: 89)",
          },
          {
            id: "c01-d3-s3",
            text: "Bộ phận: Phát triển Lõi AI — Quyền hạn: Cấp 2 (Lab Tầng 4)",
            isClue: false,
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Đọc kỹ 'Ghi chú nháp' để biết công thức ghép 4 chữ số, rồi đối chiếu 2 tab còn lại.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Sinh nhật mẹ là 12/05 → lấy 2 chữ số NGÀY (12). Mã NV là DEV-4089 → lấy 2 số cuối (89).",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép liền '12' và '89' không có khoảng trắng để tạo mật khẩu 4 chữ số.",
      },
    ],
  },

  {
    order: 2,
    slug: "case-02",
    chapter: "CHƯƠNG 1 // LOCALHOST",
    chapterNumber: 1,
    title: "Kẻ Nội Gián Lúc Nửa Đêm",
    difficulty: "Dễ",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Cipher, tôi là Khánh Vy! An ninh tòa nhà đang đổ tội cho Quốc Bảo vì cậu ta quẹt thẻ ra về lúc 00:20, ngay sau khi hệ thống báo động. Nhưng sổ ghi tay của bác bảo vệ ở sảnh lại kể một câu chuyện khác...",
    victoryNote:
      "Đúng rồi, chính tôi quay lại lúc 23:15 để lén sao chép lịch trình của thầy Khôi và rời đi sau cùng lúc 00:35. Tới quán cà phê đối diện trụ sở thôi!",
    visualType: "FLOOR_MAP",
    briefing:
      "Tìm mã truy cập tạm thời theo định dạng: [TÊN NGƯỜI RỜI VĂN PHÒNG MUỘN NHẤT] + [SỐ PHÚT CẢNH BÁO]. (VD: NAM30)",
    answer: "VY14",
    inputPlaceholder: "VD: NAM30",
    documents: [
      {
        id: "doc-02-1",
        title: "Log Server",
        docType: "LOG",
        meta: "/var/log/aether-auth.log",
        content:
          "[ALERT] Tạo mã truy cập tạm thời lúc 00:14 từ thiết bị nội bộ tầng 4.",
        isClue: true,
        segments: [
          {
            id: "c02-d1-s1",
            text: "[INFO] 23:55:02 — Khởi chạy bản sao lưu tự động định kỳ.",
            isClue: false,
          },
          {
            id: "c02-d1-s2",
            text: "[ALERT] Tạo mã truy cập tạm thời lúc 00:14 từ thiết bị nội bộ tầng 4.",
            isClue: true,
            clueLabel: "Cảnh báo lúc 00:14 → Số phút cảnh báo: 14",
          },
          {
            id: "c02-d1-s3",
            text: "[WARN] 00:21:19 — Phiên đăng nhập khách đã tự động đóng.",
            isClue: false,
          },
        ],
      },
      {
        id: "doc-02-2",
        title: "Cổng Quẹt Thẻ",
        docType: "ACCESS",
        meta: "RFID Gate Floor-04 // Đêm 24/11",
        content:
          "23:10 — Trần Khánh Vy (Ra về) | 00:20 — Phạm Quốc Bảo (Ra về)",
        isClue: true,
        segments: [
          {
            id: "c02-d2-s1",
            text: "22:30 — TS. Lê Minh Khôi (Vào phòng Lab Tầng 4)",
            isClue: false,
          },
          {
            id: "c02-d2-s2",
            text: "23:10 — Trần Khánh Vy (Ra về) | 00:20 — Phạm Quốc Bảo (Ra về)",
            isClue: true,
            clueLabel: "Quẹt thẻ: Quốc Bảo ra về lúc 00:20",
          },
        ],
      },
      {
        id: "doc-02-3",
        title: "Sổ Bảo Vệ",
        docType: "NOTE",
        meta: "Sổ trực sảnh trệt — Bác Hùng (Ca đêm)",
        content:
          "23:15 Khánh Vy quay lại lấy sạc laptop, rời đi chính thức lúc 00:35.",
        isClue: true,
        segments: [
          {
            id: "c02-d3-s1",
            text: "23:00 Kiểm tra khóa cửa thoát hiểm khu B: Bình thường.",
            isClue: false,
          },
          {
            id: "c02-d3-s2",
            text: "23:15 Khánh Vy quay lại lấy sạc laptop, rời đi chính thức lúc 00:35.",
            isClue: true,
            clueLabel: "Khánh Vy thực tế rời đi muộn nhất lúc 00:35",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Đối chiếu Cổng Quẹt Thẻ với Sổ Bảo Vệ để xem ai thực sự rời đi muộn nhất.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Quốc Bảo về lúc 00:20, còn Khánh Vy rời đi chính thức lúc 00:35 → lấy tên 'VY'. Cảnh báo lúc 00:14 → lấy phút '14'.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép tên 'VY' với '14' thành chuỗi 4 ký tự.",
      },
    ],
  },

  {
    order: 3,
    slug: "case-03",
    chapter: "CHƯƠNG 1 // LOCALHOST",
    chapterNumber: 1,
    title: "Cuộc Gặp Bí Mật Ở Quán Cà Phê",
    difficulty: "Dễ",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Trước khi biến mất, thầy Khôi đã hẹn gặp người cung cấp tin tại quán cà phê đối diện trụ sở và gửi lại một chiếc vali khóa số ở quầy thu ngân.",
    victoryNote:
      "Vali đã bật khóa! Bên trong có máy ghi âm kỹ thuật số của thầy Khôi cùng mảnh vé lên máy bay đã bị xé góc.",
    visualType: "RECEIPT",
    briefing:
      "TS. Khôi dùng số tiền phần nước của riêng ông (tính theo nghìn đồng) ghép với số bàn để làm mã khóa vali.",
    answer: "7508",
    inputPlaceholder: "4 chữ số...",
    documents: [
      {
        id: "doc-03-1",
        title: "Hóa Đơn",
        docType: "RECEIPT",
        meta: "CYBER BREW COFFEE — Đối diện tháp AetherCorp",
        content:
          "Bàn số: 08 — 19:20 | 1x Cà phê muối: 35.000đ | 1x Trà đào cam sả: 40.000đ | 1x Bánh Tiramisu: 55.000đ",
        isClue: true,
        segments: [
          {
            id: "c03-d1-s1",
            text: "HÓA ĐƠN THANH TOÁN #CB-1124 — CHI NHÁNH NEO-SAIGON",
            isClue: false,
          },
          {
            id: "c03-d1-s2",
            text: "Bàn số: 08 — 19:20",
            isClue: true,
            clueLabel: "Số bàn trên hóa đơn: 08",
          },
          {
            id: "c03-d1-s3",
            text: "1x Cà phê muối: 35.000đ\n1x Trà đào cam sả: 40.000đ",
            isClue: true,
            clueLabel: "2 ly nước: 35.000đ + 40.000đ = 75.000đ (75 nghìn)",
          },
          {
            id: "c03-d1-s4",
            text: "1x Bánh Tiramisu: 55.000đ",
            isClue: false,
          },
          {
            id: "c03-d1-s5",
            text: "Tổng cộng hóa đơn: 130.000đ — Hình thức: Tiền mặt",
            isClue: false,
          },
        ],
      },
      {
        id: "doc-03-2",
        title: "Tin Nhắn",
        docType: "MESSAGE",
        meta: "Encrypted Chat // 19:24",
        content:
          "Thầy Khôi: Hôm nay tôi chỉ thanh toán phần 2 ly nước của bàn mình thôi nhé, phần bánh của cậu tự tính riêng.",
        isClue: true,
        segments: [
          {
            id: "c03-d2-s1",
            text: "Nguồn tin X: Cảm ơn thầy đã mang theo bản sao lưu khóa gốc.",
            isClue: false,
          },
          {
            id: "c03-d2-s2",
            text: "Hôm nay tôi chỉ thanh toán phần 2 ly nước của bàn mình thôi nhé, phần bánh của cậu tự tính riêng.",
            isClue: true,
            clueLabel: "TS. Khôi chỉ thanh toán 2 ly nước (không tính bánh)",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Bỏ qua món bánh Tiramisu (55.000đ), chỉ cộng tiền 2 ly nước của TS. Khôi.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "35 + 40 = 75 (nghìn đồng). Số bàn là 08.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép '75' và '08' liền nhau để tạo mã khóa 4 chữ số.",
      },
    ],
  },

  {
    order: 4,
    slug: "case-04",
    chapter: "CHƯƠNG 1 // LOCALHOST",
    chapterNumber: 1,
    title: "Chuyến Bay Bị Trễ",
    difficulty: "Dễ",
    timeLimit: null,
    speaker: "KHOI",
    dialogue:
      "[Bản ghi âm trong vali]: 'Nếu cậu mở được vali này, nghĩa là bọn chúng đã cắn câu. Tôi cố tình để lộ thông tin đặt vé để đánh lạc hướng đội truy sát, và đã lên một chuyến bay bị trễ ngay trước giờ cất cánh...'",
    victoryNote:
      "Xuất sắc! Chuyến bay VN214 chỉ là mồi nhử đánh lạc hướng bọn truy sát — thực tế tôi đã quay ngược vào tầng hầm trụ sở. Cẩn thận, Trần Đăng Khoa đang khóa chặt Tầng 4!",
    visualType: "FLIGHT_BOARD",
    briefing:
      "Tìm mã hiệu chuyến bay mà TS. Khôi đã bước lên lúc 11:10 dựa theo bảng điện tử sân bay.",
    answer: "VN214",
    inputPlaceholder: "Mã chuyến bay...",
    documents: [
      {
        id: "doc-04-1",
        title: "Bảng Điện Tử",
        docType: "BOARD",
        meta: "Cảng Hàng Không Quốc Tế Neo-Saigon // Nhà ga T3",
        content:
          "VN102 | 08:00 | Đúng giờ / VN214 | 10:30 | Trễ 45 phút (Cất cánh 11:15) / VJ309 | 14:00 | Đã hủy",
        isClue: true,
        segments: [
          {
            id: "c04-d1-s1",
            text: "VN102 | 08:00 | Đúng giờ (Đã khởi hành)",
            isClue: false,
          },
          {
            id: "c04-d1-s2",
            text: "VN214 | 10:30 | Trễ 45 phút (Cất cánh 11:15)",
            isClue: true,
            clueLabel: "VN214 bị trễ 45 phút, cất cánh thực tế lúc 11:15",
          },
          {
            id: "c04-d1-s3",
            text: "VJ309 | 14:00 | Đã hủy",
            isClue: false,
          },
        ],
      },
      {
        id: "doc-04-2",
        title: "Tin Nhắn",
        docType: "MESSAGE",
        meta: "Kênh Khẩn Cấp #KHOI-09",
        content:
          "11:10: Tôi vừa yên vị trên ghế máy bay rồi, chuẩn bị cất cánh.",
        isClue: true,
        segments: [
          {
            id: "c04-d2-s1",
            text: "11:10: Tôi vừa yên vị trên ghế máy bay rồi, chuẩn bị cất cánh.",
            isClue: true,
            clueLabel: "11:10 chuẩn bị cất cánh → khớp giờ bay 11:15 của VN214",
          },
          {
            id: "c04-d2-s2",
            text: "[TÍN HIỆU NGẮT KẾT NỐI — CHẾ ĐỘ MÁY BAY]",
            isClue: false,
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "So sánh mốc 11:10 trong tin nhắn với giờ cất cánh thực tế của từng chuyến bay.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Phân tích",
        text: "VN102 bay lúc 08:00, VJ309 đã hủy. Chỉ có chuyến trễ 45 phút cất cánh lúc 11:15 khớp mốc 11:10.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Nhập mã hiệu 5 ký tự của chuyến bay đó (bắt đầu bằng VN).",
      },
    ],
  },

  {
    order: 5,
    slug: "case-05",
    chapter: "CHƯƠNG 1 // LOCALHOST",
    chapterNumber: 1,
    title: "Cổng Xác Thực Tầng 4",
    difficulty: "Boss",
    timeLimit: 90,
    speaker: "KHOA",
    dialogue:
      "[CẢNH BÁO XÂM NHẬP — CEO TRẦN ĐĂNG KHOA]: 'Phát hiện kết nối trái phép đang truy xuất hồ sơ tầng 4! Đội an ninh mạng, kích hoạt khóa từ khẩn cấp trong 90 giây!'",
    victoryNote:
      "Cửa từ Tầng 4 đã bị vượt qua ngay trước mắt Trần Đăng Khoa! Bạn vừa chính thức xâm nhập vào Lớp Bảo Mật 2: Mạng lưới Proxy Server.",
    visualType: "SECURITY_GATE",
    briefing:
      "Vượt qua cổng an ninh tầng 4 trước khi hết 90 giây! Định dạng: [TÊN PHÒNG] + [SỐ TẦNG] + [PHÚT MẤT ĐIỆN].",
    answer: "ALPHA440",
    inputPlaceholder: "VD: BETA215",
    documents: [
      {
        id: "doc-05-1",
        title: "Sơ Đồ Tòa Nhà",
        docType: "MAP",
        meta: "Blueprint AetherTower // Khu An Ninh Cao",
        content: "Tầng 4 — Khu vực trung tâm: Phòng họp ALPHA",
        isClue: true,
        segments: [
          {
            id: "c05-d1-s1",
            text: "KẾT CẤU TRỤ SỞ CHÍNH AETHERCORP — KHU VỰC R&D",
            isClue: false,
          },
          {
            id: "c05-d1-s2",
            text: "Tầng 4 — Khu vực trung tâm: Phòng họp ALPHA",
            isClue: true,
            clueLabel: "Tên phòng: ALPHA | Số tầng: 4",
          },
        ],
      },
      {
        id: "doc-05-2",
        title: "Sự Cố Điện",
        docType: "LOG",
        meta: "PowerGrid Telemetry // Trạm Biến Áp Nội Bộ",
        content: "22:40 — Mất điện lưới toàn bộ tầng 4 do quá tải.",
        isClue: true,
        segments: [
          {
            id: "c05-d2-s1",
            text: "22:15 — Tải tiêu thụ đạt 88% định mức.",
            isClue: false,
          },
          {
            id: "c05-d2-s2",
            text: "22:40 — Mất điện lưới toàn bộ tầng 4 do quá tải.",
            isClue: true,
            clueLabel: "Mất điện lúc 22:40 → Số phút: 40",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Ghép đúng 3 phần: [TÊN PHÒNG] + [SỐ TẦNG] + [PHÚT MẤT ĐIỆN], viết liền không dấu cách.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Phòng họp ALPHA, Tầng 4, sự cố điện lúc 22:40 → phần phút là 40.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép 'ALPHA' + '4' + '40' thành chuỗi 8 ký tự.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 2 // PROXY SERVER — MẠNG LƯỚI BÓNG MA
  // =========================================================================
  {
    order: 6,
    slug: "case-06",
    chapter: "CHƯƠNG 2 // PROXY SERVER",
    chapterNumber: 2,
    title: "Bức Thư Rác Kỳ Lạ",
    difficulty: "Trung bình",
    timeLimit: null,
    speaker: "KHOI",
    dialogue:
      "Cậu đã lọt được vào mạng nội bộ tầng 4. Để tránh bộ lọc từ khóa của Trần Đăng Khoa, tôi đã giấu tên máy chủ trung gian ngay trong một bức email thông báo bảo trì bình thường.",
    victoryNote:
      "Máy chủ trung gian GHOST đã phản hồi ping! Tiếp tục phá lớp mã hóa phòng Lab để mở đường hầm Proxy.",
    visualType: "EMAIL_CIPHER",
    briefing:
      "Tìm từ khóa bí mật 5 chữ cái được giấu ở đầu mỗi dòng trong bức email nội bộ.",
    answer: "GHOST",
    inputPlaceholder: "5 chữ cái...",
    documents: [
      {
        id: "doc-06-1",
        title: "Email Nội Bộ",
        docType: "EMAIL",
        meta: "From: khoi.le@aethercorp.vn // Subject: Re: Bảo trì định kỳ",
        content:
          "Gửi anh danh sách thiết bị mới.\nHệ thống camera đã nâng cấp.\nOffice khu B bảo trì cuối tuần.\nServer phụ đã sao lưu xong.\nTất cả vui lòng xác nhận trước 17h.",
        isClue: true,
        segments: [
          {
            id: "c06-d1-s1",
            text: "Gửi anh danh sách thiết bị mới.\nHệ thống camera đã nâng cấp.\nOffice khu B bảo trì cuối tuần.\nServer phụ đã sao lưu xong.\nTất cả vui lòng xác nhận trước 17h.",
            isClue: true,
            clueLabel: "Chữ cái đầu 5 dòng: G - H - O - S - T",
          },
          {
            id: "c06-d1-s2",
            text: "-- Bộ phận Quản trị Hạ tầng Tầng 4 --",
            isClue: false,
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Đọc theo chiều dọc lấy chữ cái đầu tiên của mỗi dòng trong bức email.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "5 dòng lần lượt bắt đầu bằng: G, H, O, S, T.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép 5 chữ cái thành từ tiếng Anh 5 ký tự nghĩa là 'Bóng ma'.",
      },
    ],
  },

  {
    order: 7,
    slug: "case-07",
    chapter: "CHƯƠNG 2 // PROXY SERVER",
    chapterNumber: 2,
    title: "Mật Mã Caesar Tại Phòng Lab",
    difficulty: "Trung bình",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Đội bảo mật của Khoa đang dò ra máy chủ GHOST! Thầy Khôi có viết một chuỗi mật mã dịch chuyển trên bảng kính phòng Lab. Mở Công cụ Giải mã nhanh lên đi Cipher!",
    victoryNote:
      "Đường hầm Proxy đã thông suốt! Nhưng thầy Khôi còn khóa thêm một lớp PIN tọa độ bằng ghi âm.",
    visualType: "CAESAR_BOARD",
    briefing:
      "Giải mã chuỗi ký tự trên bảng trắng theo quy tắc dịch chuyển Caesar để lấy mật khẩu đăng nhập Proxy.",
    answer: "ACCESS",
    inputPlaceholder: "6 chữ cái...",
    documents: [
      {
        id: "doc-07-1",
        title: "Bảng Trắng",
        docType: "BOARD",
        meta: "Ảnh chụp Camera Phòng Lab #04",
        content: "Chuỗi mã hóa: DFFHVV",
        isClue: true,
        segments: [
          {
            id: "c07-d1-s1",
            text: "[ẢNH QUÉT TỪ BẢNG KÍNH PHÒNG LAB TẦNG 4]",
            isClue: false,
          },
          {
            id: "c07-d1-s2",
            text: "Chuỗi mã hóa: DFFHVV",
            isClue: true,
            clueLabel: "Bản mã Caesar: DFFHVV",
          },
        ],
      },
      {
        id: "doc-07-2",
        title: "Giấy Nhớ",
        docType: "NOTE",
        meta: "Sticky Note dán dưới màn hình phụ",
        content:
          "Quy tắc Caesar: Lùi mỗi chữ cái về phía trước 3 bước trong bảng chữ cái (VD: D -> A).",
        isClue: true,
        segments: [
          {
            id: "c07-d2-s1",
            text: "Quy tắc Caesar: Lùi mỗi chữ cái về phía trước 3 bước trong bảng chữ cái (VD: D -> A).",
            isClue: true,
            clueLabel: "Dịch chuyển Caesar: -3 bước (D -> A)",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Nhấn nút 'Công cụ Giải mã' trên thanh HUD → chọn tab Caesar.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Nhập 'DFFHVV' và kéo thanh trượt về mức -3.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "D→A, F→C, F→C, H→E, V→S, V→S → từ tiếng Anh 6 chữ cái nghĩa là 'Truy cập'.",
      },
    ],
  },

  {
    order: 8,
    slug: "case-08",
    chapter: "CHƯƠNG 2 // PROXY SERVER",
    chapterNumber: 2,
    title: "Tọa Độ Bàn Phím Số",
    difficulty: "Trung bình",
    timeLimit: null,
    speaker: "KHOI",
    dialogue:
      "Phòng Lab có gắn micro nghe lén nên tôi không bao giờ đọc thẳng mật khẩu thành tiếng. Hãy tưởng tượng một bàn phím số Numpad tiêu chuẩn và đi theo hướng dẫn hình học của tôi.",
    victoryNote:
      "Chính xác! Không một thiết bị nghe lén nào giải nổi mẹo hình học Numpad đó. Kiểm tra tín hiệu Router dự phòng của Khánh Vy ngay!",
    visualType: "NUMPAD_GRID",
    briefing:
      "Dựa vào mô tả vị trí các phím trên bàn phím số (Numpad chuẩn), tìm ra mã PIN 4 chữ số.",
    answer: "5820",
    inputPlaceholder: "4 chữ số...",
    documents: [
      {
        id: "doc-08-1",
        title: "Ghi Âm Giải Mã",
        docType: "AUDIO",
        meta: "voice_memo_08.wav // Đã khử nhiễu",
        content:
          "Số đầu tiên nằm ở chính giữa bàn phím số (từ 1-9). Số thứ hai nằm ngay phía trên nó. Số thứ ba nằm ngay phía dưới nó. Số cuối cùng nằm ở hàng dưới cùng.",
        isClue: true,
        segments: [
          {
            id: "c08-d1-s1",
            text: "[BẢN CHÉP LỜI GHI ÂM — TS. LÊ MINH KHÔI]",
            isClue: false,
          },
          {
            id: "c08-d1-s2",
            text: "Số đầu tiên nằm ở chính giữa bàn phím số (từ 1-9). Số thứ hai nằm ngay phía trên nó. Số thứ ba nằm ngay phía dưới nó. Số cuối cùng nằm ở hàng dưới cùng.",
            isClue: true,
            clueLabel: "Numpad chuẩn: Giữa (5) → Trên (8) → Dưới (2) → Hàng đáy (0)",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Quan sát sơ đồ Numpad trong khung SVG: hàng trên 7-8-9, giữa 4-5-6, dưới 1-2-3 và đáy là 0.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Tọa độ",
        text: "Chính giữa lưới 1-9 là 5. Ngay phía trên 5 là 8. Ngay phía dưới 5 là 2.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Hàng dưới cùng là phím 0 → ghép lần lượt 5, 8, 2, 0.",
      },
    ],
  },

  {
    order: 9,
    slug: "case-09",
    chapter: "CHƯƠNG 2 // PROXY SERVER",
    chapterNumber: 2,
    title: "Tín Hiệu Đèn Router",
    difficulty: "Trung bình",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Bọn chúng vừa ngắt cáp quang chính! Tôi đã nối camera giám sát vào chiếc Router dự phòng — đèn trạng thái của nó đang nhấp nháy mã Morse tên máy chủ chứa lõi dữ liệu!",
    victoryNote:
      "Đã định vị máy chủ lạnh NODE9! Cảnh báo: hệ thống phòng thủ EREBUS-9 vừa phát hiện kết nối của chúng ta!",
    visualType: "MORSE_ROUTER",
    briefing:
      "Dịch tín hiệu đèn Morse của Router để tìm tên máy chủ đang giữ bản sao lưu của TS. Khôi.",
    answer: "NODE9",
    inputPlaceholder: "Tên máy chủ...",
    documents: [
      {
        id: "doc-09-1",
        title: "Nhật Ký Đèn",
        docType: "LOG",
        meta: "optical_sensor_router02.log",
        content: "Tín hiệu: -. / --- / -.. / . / ----.",
        isClue: true,
        segments: [
          {
            id: "c09-d1-s1",
            text: "[CẢM BIẾN QUANG HỌC — ĐÈN LED ROUTER DỰ PHÒNG]",
            isClue: false,
          },
          {
            id: "c09-d1-s2",
            text: "Tín hiệu: -. / --- / -.. / . / ----.",
            isClue: true,
            clueLabel: "Chuỗi Morse: -. / --- / -.. / . / ----.",
          },
        ],
      },
      {
        id: "doc-09-2",
        title: "Ghi Chú Kỹ Thuật",
        docType: "NOTE",
        meta: "ITU-R M.1677 Reference",
        content:
          "Mỗi cụm ngăn cách bởi dấu '/' tương ứng với 1 ký tự Morse chuẩn quốc tế.",
        isClue: false,
        segments: [
          {
            id: "c09-d2-s1",
            text: "Mỗi cụm ngăn cách bởi dấu '/' tương ứng với 1 ký tự Morse chuẩn quốc tế.",
            isClue: false,
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Mở 'Công cụ Giải mã' → tab Morse và nhập chuỗi `-. / --- / -.. / . / ----.`.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Giải mã",
        text: "`-.` = N, `---` = O, `-..` = D, `.` = E.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Cụm cuối `----.` là số 9 → ghép liền thành tên máy chủ 5 ký tự.",
      },
    ],
  },

  {
    order: 10,
    slug: "case-10",
    chapter: "CHƯƠNG 2 // PROXY SERVER",
    chapterNumber: 2,
    title: "Kho Dữ Liệu Lạnh",
    difficulty: "Boss",
    timeLimit: 100,
    speaker: "EREBUS",
    dialogue:
      "[HỆ THỐNG PHÒNG THỦ EREBUS-9]: 'Phát hiện truy cập trái phép vào Phân vùng Lạnh NODE9. Tiến trình đóng băng dữ liệu sẽ hoàn tất sau 100 giây. Xác thực khóa ASCII Hex để tiếp tục.'",
    victoryNote:
      "Tiến trình đóng băng NODE9 đã bị vô hiệu hóa! Cánh cổng dẫn vào Chương 3: Kho Lưu Trữ Sâu (Deep Archive) đã mở rộng.",
    visualType: "HEX_CORE",
    briefing:
      "Chuyển đổi mã Hex sang ký tự ASCII và ghép với 2 số cuối năm thành lập AetherCorp trước khi hết 100 giây.",
    answer: "KEY26",
    inputPlaceholder: "5 ký tự...",
    documents: [
      {
        id: "doc-10-1",
        title: "Header Tệp Tin",
        docType: "CODE",
        meta: "NODE9://cold-vault/auth.bin",
        content: "HEX_PREFIX: 4B 45 59",
        isClue: true,
        segments: [
          {
            id: "c10-d1-s1",
            text: "0x0000: EREBUS_VAULT_V9 // LOCK_STATE=FREEZING",
            isClue: false,
          },
          {
            id: "c10-d1-s2",
            text: "HEX_PREFIX: 4B 45 59",
            isClue: true,
            clueLabel: "Mã ASCII Hex: 4B 45 59",
          },
        ],
      },
      {
        id: "doc-10-2",
        title: "Hồ Sơ Công Ty",
        docType: "FILE",
        meta: "AetherCorp Registry // Neo-Saigon",
        content: "Năm thành lập hệ thống AetherCorp: 2026",
        isClue: true,
        segments: [
          {
            id: "c10-d2-s1",
            text: "Giấy phép vận hành Hạ tầng Đô thị Thông minh #NSG-09",
            isClue: false,
          },
          {
            id: "c10-d2-s2",
            text: "Năm thành lập hệ thống AetherCorp: 2026",
            isClue: true,
            clueLabel: "2 số cuối năm thành lập: 26",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Mở 'Công cụ Giải mã' → tab ASCII Hex và nhập `4B 45 59`.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Chuyển đổi",
        text: "4B = K, 45 = E, 59 = Y. Hai số cuối của năm 2026 là 26.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép 'KEY' và '26' liền nhau thành chuỗi 5 ký tự.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 3 // DEEP ARCHIVE — NHỮNG KẺ PHẢN BỘI
  // =========================================================================
  {
    order: 11,
    slug: "case-11",
    chapter: "CHƯƠNG 3 // DEEP ARCHIVE",
    chapterNumber: 3,
    title: "Ba Lời Khai Ở Căn-Tin",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Chúng ta đã vào được Kho Lưu Trữ Sâu! Trong này có biên bản thẩm vấn nội bộ đêm thầy Khôi mất tích. Có một kẻ đã khai gian vị trí của hắn lúc 21:00 — hãy đối chiếu với cảm biến thời tiết tòa nhà.",
    victoryNote:
      "Lật tẩy thành công! Tuấn đã khai gian để che giấu việc hắn đi tắt camera tầng 4. Hãy lần theo dòng tiền hối lộ trả cho hắn!",
    visualType: "SENSOR_RADAR",
    briefing:
      "Một trong ba nhân viên đang nói dối về vị trí của mình lúc 21:00. Nhập TÊN (viết không dấu) của kẻ nói dối.",
    answer: "TUAN",
    inputPlaceholder: "Tên kẻ nói dối...",
    documents: [
      {
        id: "doc-11-1",
        title: "Biên Bản Lời Khai",
        docType: "FILE",
        meta: "Hồ sơ thẩm vấn nội bộ #IA-2411",
        content:
          "Tuấn: Lúc 21:00 tôi đứng hóng gió ngoài sân thượng, trời quang mây tạnh.\nHùng: Tôi ở tầng hầm lấy đồ lúc 21:05.\nLâm: Tôi đi từ sảnh lễ tân lên thang máy lúc 21:00.",
        isClue: true,
        segments: [
          {
            id: "c11-d1-s1",
            text: "Tuấn: Lúc 21:00 tôi đứng hóng gió ngoài sân thượng, trời quang mây tạnh.",
            isClue: true,
            clueLabel: "Tuấn khai 21:00 đứng sân thượng trời quang mây tạnh",
          },
          {
            id: "c11-d1-s2",
            text: "Hùng: Tôi ở tầng hầm lấy đồ lúc 21:05.",
            isClue: false,
          },
          {
            id: "c11-d1-s3",
            text: "Lâm: Tôi đi từ sảnh lễ tân lên thang máy lúc 21:00.",
            isClue: false,
          },
        ],
      },
      {
        id: "doc-11-2",
        title: "Dữ Liệu Cảm Biến",
        docType: "LOG",
        meta: "Weather & Roof Security Telemetry",
        content:
          "20:45 - 21:30: Mưa giông lớn kèm sấm sét, cửa tự động sân thượng đã khóa từ 20:40.",
        isClue: true,
        segments: [
          {
            id: "c11-d2-s1",
            text: "20:30: Áp suất khí quyển giảm đột ngột, gió giật cấp 7.",
            isClue: false,
          },
          {
            id: "c11-d2-s2",
            text: "20:45 - 21:30: Mưa giông lớn kèm sấm sét, cửa tự động sân thượng đã khóa từ 20:40.",
            isClue: true,
            clueLabel: "20:45-21:30 mưa giông lớn & sân thượng khóa từ 20:40",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Kiểm tra ai khai ở ngoài trời vào khung giờ 20:45 - 21:30.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Đối chiếu",
        text: "Cảm biến ghi mưa giông lớn và cửa sân thượng khóa từ 20:40 → mâu thuẫn hoàn toàn với lời khai của Tuấn.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Nhập tên không dấu của kẻ nói dối: 4 chữ cái.",
      },
    ],
  },

  {
    order: 12,
    slug: "case-12",
    chapter: "CHƯƠNG 3 // DEEP ARCHIVE",
    chapterNumber: 3,
    title: "Giao Dịch Đáng Ngờ",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "KHOI",
    dialogue:
      "Tuấn chỉ là tay sai được thuê để vô hiệu hóa camera. Trong nhật ký kiểm toán tôi thu thập được trước khi mất tích, kẻ chủ mưu đã chia nhỏ tiền hối lộ ngay dưới mức cảnh báo 10 triệu đồng.",
    victoryNote:
      "Bằng chứng tài chính TX884 đã được niêm phong! 5 lệnh 9,9 triệu lúc rạng sáng nối thẳng tới tài khoản mật của ban điều hành.",
    visualType: "BANK_FLOW",
    briefing:
      "Tìm mã giao dịch bất thường được chia nhỏ để né ngưỡng kiểm duyệt tự động (10.000.000đ).",
    answer: "TX884",
    inputPlaceholder: "Mã giao dịch...",
    documents: [
      {
        id: "doc-12-1",
        title: "Sao Kê Hệ Thống",
        docType: "LOG",
        meta: "AetherFin Audit Ledger // Ngưỡng cảnh báo: 10.000.000đ",
        content:
          "TX101 | 50.000.000đ | 01:10 | Hợp đồng đối tác\nTX884 | 9.900.000đ | 02:45 | Chuyển khoản nội bộ (Lặp lại 5 lần)\nTX902 | 12.000.000đ | 03:15 | Đã hủy bởi người gửi",
        isClue: true,
        segments: [
          {
            id: "c12-d1-s1",
            text: "TX101 | 50.000.000đ | 01:10 | Hợp đồng đối tác",
            isClue: false,
          },
          {
            id: "c12-d1-s2",
            text: "TX884 | 9.900.000đ | 02:45 | Chuyển khoản nội bộ (Lặp lại 5 lần)",
            isClue: true,
            clueLabel: "TX884: 9.900.000đ lặp lại 5 lần né ngưỡng 10 triệu",
          },
          {
            id: "c12-d1-s3",
            text: "TX902 | 12.000.000đ | 03:15 | Đã hủy bởi người gửi",
            isClue: false,
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Tìm giao dịch có số tiền sát dưới ngưỡng 10.000.000đ và lặp lại nhiều lần.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Phân tích",
        text: "Giao dịch 9.900.000đ lặp lại 5 lần lúc 02:45 là hành vi chia nhỏ né kiểm duyệt.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Nhập mã giao dịch 5 ký tự bắt đầu bằng 'TX' của dòng đó.",
      },
    ],
  },

  {
    order: 13,
    slug: "case-13",
    chapter: "CHƯƠNG 3 // DEEP ARCHIVE",
    chapterNumber: 3,
    title: "Hiện Trường Tủ Rack",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Tôi vừa lẻn vào phòng Tủ Rack trung tâm! Kẻ đột nhập đã rút phăng một sợi cáp quang để ngắt kết nối ổ cứng ghi nhật ký gốc của thầy Khôi.",
    victoryNote:
      "Ổ cứng SN-9042-X đã sáng đèn trở lại! Dữ liệu log gốc đang chảy về, nhưng EREBUS-9 đang bơm gói tin nhiễu vào luồng!",
    visualType: "SERVER_RACK",
    briefing:
      "Khôi phục mã bảo trì theo công thức: [3 SỐ ĐẦU SERIAL Ổ CỨNG] + [MÀU DÂY CÁP BỊ RÚT RA (TIẾNG ANH)].",
    answer: "904RED",
    inputPlaceholder: "VD: 123BLUE",
    documents: [
      {
        id: "doc-13-1",
        title: "Kiểm Kê Phần Cứng",
        docType: "FILE",
        meta: "Rack-07 // Storage Array Diagnostic",
        content:
          "Ổ cứng chính: SN-9042-X (Trạng thái: Ngắt kết nối đột ngột)",
        isClue: true,
        segments: [
          {
            id: "c13-d1-s1",
            text: "Ổ cứng phụ #1: SN-4110-B (Trạng thái: Hoạt động bình thường)",
            isClue: false,
          },
          {
            id: "c13-d1-s2",
            text: "Ổ cứng chính: SN-9042-X (Trạng thái: Ngắt kết nối đột ngột)",
            isClue: true,
            clueLabel: "Serial ổ cứng chính: SN-9042-X → 3 số đầu: 904",
          },
        ],
      },
      {
        id: "doc-13-2",
        title: "Ghi Chú Kỹ Thuật",
        docType: "NOTE",
        meta: "Báo cáo hiện trường của Khánh Vy",
        content:
          "Dây cáp xanh (BLUE) và xanh lá (GREEN) vẫn cắm chặt. Chỉ có cáp đỏ (RED) nằm rơi dưới sàn.",
        isClue: true,
        segments: [
          {
            id: "c13-d2-s1",
            text: "Dây cáp xanh (BLUE) và xanh lá (GREEN) vẫn cắm chặt.",
            isClue: false,
          },
          {
            id: "c13-d2-s2",
            text: "Chỉ có cáp đỏ (RED) nằm rơi dưới sàn.",
            isClue: true,
            clueLabel: "Sợi cáp bị rút ra: màu đỏ (RED)",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Lấy 3 chữ số đầu của ổ cứng đang bị ngắt kết nối và tên tiếng Anh màu sợi cáp rơi dưới sàn.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "SN-9042-X → 3 số đầu là '904'. Cáp bị rút là cáp đỏ → 'RED'.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép liền '904' + 'RED' thành chuỗi 6 ký tự.",
      },
    ],
  },

  {
    order: 14,
    slug: "case-14",
    chapter: "CHƯƠNG 3 // DEEP ARCHIVE",
    chapterNumber: 3,
    title: "Lọc Gói Tin Nhiễu",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "KHOI",
    dialogue:
      "Ổ cứng đã hoạt động trở lại, nhưng EREBUS-9 đang bơm hàng loạt gói tin rác để làm nhiễu khóa giải mã của tôi. Chỉ giữ lại những gói tin có tổng hai chữ số là số chẵn!",
    victoryNote:
      "Khóa lọc ORBIT chuẩn xác! Nhưng cẩn thận — Trần Đăng Khoa vừa kích hoạt cửa sập hầm lõi ngay phía trước!",
    visualType: "PACKET_STREAM",
    briefing:
      "Chỉ những gói tin có TỔNG HAI CHỮ SỐ LÀ SỐ CHẴN mới hợp lệ. Ghép các chữ cái trong ngoặc theo thứ tự từ trên xuống.",
    answer: "ORBIT",
    inputPlaceholder: "5 chữ cái...",
    documents: [
      {
        id: "doc-14-1",
        title: "Luồng Dữ Liệu",
        docType: "LOG",
        meta: "tcpdump -i eth0 // Stream Filter: EVEN_DIGIT_SUM",
        content:
          "PKT-13 [O]\nPKT-25 [X]\nPKT-44 [R]\nPKT-71 [B]\nPKT-12 [Z]\nPKT-60 [I]\nPKT-82 [T]",
        isClue: true,
        segments: [
          {
            id: "c14-d1-s1",
            text: "PKT-13 [O]",
            isClue: true,
            clueLabel: "PKT-13: 1 + 3 = 4 (Chẵn) → [O]",
          },
          {
            id: "c14-d1-s2",
            text: "PKT-25 [X]",
            isClue: false,
          },
          {
            id: "c14-d1-s3",
            text: "PKT-44 [R]",
            isClue: true,
            clueLabel: "PKT-44: 4 + 4 = 8 (Chẵn) → [R]",
          },
          {
            id: "c14-d1-s4",
            text: "PKT-71 [B]",
            isClue: true,
            clueLabel: "PKT-71: 7 + 1 = 8 (Chẵn) → [B]",
          },
          {
            id: "c14-d1-s5",
            text: "PKT-12 [Z]",
            isClue: false,
          },
          {
            id: "c14-d1-s6",
            text: "PKT-60 [I]",
            isClue: true,
            clueLabel: "PKT-60: 6 + 0 = 6 (Chẵn) → [I]",
          },
          {
            id: "c14-d1-s7",
            text: "PKT-82 [T]",
            isClue: true,
            clueLabel: "PKT-82: 8 + 2 = 10 (Chẵn) → [T]",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Cộng hai chữ số của từng gói PKT-XX và bỏ các gói có tổng là số lẻ.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Lọc nhiễu",
        text: "PKT-25 (7) và PKT-12 (3) bị loại. Còn lại 5 gói hợp lệ.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép 5 chữ cái của 13[O], 44[R], 71[B], 60[I], 82[T] thành từ 5 chữ cái.",
      },
    ],
  },

  {
    order: 15,
    slug: "case-15",
    chapter: "CHƯƠNG 3 // DEEP ARCHIVE",
    chapterNumber: 3,
    title: "Cửa Sập Máy Chủ Trung Tâm",
    difficulty: "Boss",
    timeLimit: 110,
    speaker: "KHOA",
    dialogue:
      "[TRẦN ĐĂNG KHOA]: 'Khá lắm Cipher, nhưng trò chơi kết thúc tại đây! Hệ thống cửa sập hầm lõi sẽ đóng vĩnh viễn sau 110 giây!'",
    victoryNote:
      "Cửa sập thép nặng hàng tấn đã dừng kẹt và mở toang! Chúng ta đã tiến vào Chương cuối: ZERO-DAY CORE.",
    visualType: "VAULT_DOOR",
    briefing:
      "Đảo ngược tên dự án bí mật và ghép thêm 2 chữ số ngày triển khai để mở cửa sập trước khi hết 110 giây!",
    answer: "NOIRO26",
    inputPlaceholder: "7 ký tự...",
    documents: [
      {
        id: "doc-15-1",
        title: "Tài Liệu Mật",
        docType: "FILE",
        meta: "TOP SECRET // AetherCorp Executive Vault",
        content: "Tên dự án: ORION — Ngày kích hoạt: 26/11/2026",
        isClue: true,
        segments: [
          {
            id: "c15-d1-s1",
            text: "HỒ SƠ MẬT HẦM LÕI — PHÊ DUYỆT BỞI BAN ĐIỀU HÀNH",
            isClue: false,
          },
          {
            id: "c15-d1-s2",
            text: "Tên dự án: ORION — Ngày kích hoạt: 26/11/2026",
            isClue: true,
            clueLabel: "Dự án ORION | Ngày kích hoạt: 26",
          },
        ],
      },
      {
        id: "doc-15-2",
        title: "Quy Tắc Khóa",
        docType: "NOTE",
        meta: "Blast Door Override Protocol",
        content:
          "Mật khẩu = Đảo ngược tên dự án + 2 chữ số ngày kích hoạt.",
        isClue: true,
        segments: [
          {
            id: "c15-d2-s1",
            text: "Mật khẩu = Đảo ngược tên dự án + 2 chữ số ngày kích hoạt.",
            isClue: true,
            clueLabel: "Công thức: Đảo ngược(ORION) + 26",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Viết ngược từng chữ cái của từ ORION từ phải sang trái và lấy 2 số ngày kích hoạt.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "ORION viết ngược là NOIRO. Ngày 26/11/2026 có 2 số ngày là 26.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép 'NOIRO' + '26' thành chuỗi 7 ký tự.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 4 // ZERO-DAY CORE — GIỜ G HỦY DIỆT
  // =========================================================================
  {
    order: 16,
    slug: "case-16",
    chapter: "CHƯƠNG 4 // ZERO-DAY CORE",
    chapterNumber: 4,
    title: "Khoảng Trống Đổi Ca",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Cửa hầm đã mở! Ở hành lang dẫn vào phòng Lõi, camera an ninh đã bị cắt đúng vào khoảng trống giao ca giữa hai bảo vệ đêm qua.",
    victoryNote:
      "Cửa hành lang tầng hầm B2 đã mở khóa! Hệ thống vừa phát hiện một địa chỉ IP giả mạo đang tiêm lệnh vào mạng lõi.",
    visualType: "SHIFT_TIMELINE",
    briefing:
      "Tìm số phút không có ai trực bảo vệ ghép với mã thẻ của người trực ca trước đó.",
    answer: "12K09",
    inputPlaceholder: "VD: 15A01",
    documents: [
      {
        id: "doc-16-1",
        title: "Lịch Trực Bảo Vệ",
        docType: "FILE",
        meta: "Hành lang Tầng Hầm B2 — Phòng Lõi",
        content:
          "Ca 1 (Thẻ K09): 22:00 đến 02:00\nCa 2 (Thẻ M14): 02:12 đến 06:00",
        isClue: true,
        segments: [
          {
            id: "c16-d1-s1",
            text: "BẢNG PHÂN CÔNG TUẦN TRA HÀNH LANG LÕI — ĐÊM 24/11",
            isClue: false,
          },
          {
            id: "c16-d1-s2",
            text: "Ca 1 (Thẻ K09): 22:00 đến 02:00",
            isClue: true,
            clueLabel: "Ca 1 (ca trước): Thẻ K09, hết ca lúc 02:00",
          },
          {
            id: "c16-d1-s3",
            text: "Ca 2 (Thẻ M14): 02:12 đến 06:00",
            isClue: true,
            clueLabel: "Ca 2 vào lúc 02:12 → Trống đúng 12 phút",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Tính số phút trống giữa 02:00 và 02:12, rồi xem mã thẻ của người trực Ca 1.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Khoảng trống là 12 phút; người trực ca trước là Thẻ K09.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép '12' với 'K09' liền nhau thành mã 5 ký tự.",
      },
    ],
  },

  {
    order: 17,
    slug: "case-17",
    chapter: "CHƯƠNG 4 // ZERO-DAY CORE",
    chapterNumber: 4,
    title: "Xung Đột Địa Chỉ IP",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "SYSTEM",
    dialogue:
      "Phát hiện thiết bị lạ giả mạo máy in tầng 2 để tiêm lệnh điều khiển từ xa vào Lõi EREBUS-9! Hãy tìm địa chỉ IP đang bị gán trùng lặp trong bảng DHCP.",
    victoryNote:
      "Thiết bị giả mạo tại 192.168.1.44 đã bị ngắt khỏi mạng! Thu được tín hiệu cầu cứu yếu ớt từ TS. Khôi ngay sát phòng Lõi.",
    visualType: "IP_CONFLICT",
    briefing:
      "Tìm địa chỉ IP đang bị gán trùng cho 2 thiết bị và nhập liền các chữ số (bỏ dấu chấm).",
    answer: "192168144",
    inputPlaceholder: "9 chữ số...",
    documents: [
      {
        id: "doc-17-1",
        title: "Bảng Cấp Phát DHCP",
        docType: "LOG",
        meta: "dhcpd.leases // Mạng Nội Bộ Tầng Hầm",
        content:
          "192.168.1.10 -> Máy chủ File\n192.168.1.44 -> Máy in tầng 2\n192.168.1.44 -> Thiết bị lạ (Unknown MAC)",
        isClue: true,
        segments: [
          {
            id: "c17-d1-s1",
            text: "192.168.1.10 -> Máy chủ File",
            isClue: false,
          },
          {
            id: "c17-d1-s2",
            text: "192.168.1.44 -> Máy in tầng 2",
            isClue: true,
            clueLabel: "192.168.1.44 đang gán cho Máy in tầng 2",
          },
          {
            id: "c17-d1-s3",
            text: "192.168.1.44 -> Thiết bị lạ (Unknown MAC)",
            isClue: true,
            clueLabel: "Xung đột IP: Thiết bị lạ trùng 192.168.1.44",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Tìm địa chỉ IP xuất hiện hai lần liên tiếp trong bảng DHCP.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "IP trùng là 192.168.1.44. Xóa toàn bộ dấu chấm giữa các cụm số.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Nhập liền 9 chữ số từ 192.168.1.44 (không dấu chấm).",
      },
    ],
  },

  {
    order: 18,
    slug: "case-18",
    chapter: "CHƯƠNG 4 // ZERO-DAY CORE",
    chapterNumber: 4,
    title: "Cuộc Gọi Nặc Danh",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "KHOI",
    dialogue:
      "[Tín hiệu yếu từ phòng cách âm dưới hầm]: 'Cipher... tôi đang ở ngay sát phòng Lõi! Khoa vừa gọi điện từ bên ngoài để kích hoạt lệnh tự hủy từ xa. Hãy đếm số tiếng bíp trong file ghi âm tổng đài!'",
    victoryNote:
      "Đã chặn tín hiệu điều khiển DTMF từ mã vùng 028! Chỉ còn một lớp cửa hậu mã nguồn nữa trước khi đối mặt trực tiếp với Lõi AI!",
    visualType: "AUDIO_WAVE",
    briefing:
      "Ghép mã vùng cuộc gọi đến với số tiếng bíp ghi nhận được trước khi đường dây ngắt.",
    answer: "0285",
    inputPlaceholder: "4 chữ số...",
    documents: [
      {
        id: "doc-18-1",
        title: "Tổng Đài Nội Bộ",
        docType: "AUDIO",
        meta: "PBX Recording #9918 // Phân tích phổ DTMF",
        content:
          "Số gọi đến: (028) 3999-XXXX — Ghi âm phát hiện 5 tiếng bíp ngắn liên tiếp.",
        isClue: true,
        segments: [
          {
            id: "c18-d1-s1",
            text: "[NHẬT KÝ CUỘC GỌI ĐẾN — ĐƯỜNG DÂY KHẨN TẦNG HẦM]",
            isClue: false,
          },
          {
            id: "c18-d1-s2",
            text: "Số gọi đến: (028) 3999-XXXX — Ghi âm phát hiện 5 tiếng bíp ngắn liên tiếp.",
            isClue: true,
            clueLabel: "Mã vùng: 028 | Số tiếng bíp DTMF: 5",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Lấy mã vùng nằm trong ngoặc đơn và ghép với số tiếng bíp ghi nhận được.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Mã vùng là 028, số tiếng bíp là 5.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép '028' và '5' liền nhau thành 4 chữ số.",
      },
    ],
  },

  {
    order: 19,
    slug: "case-19",
    chapter: "CHƯƠNG 4 // ZERO-DAY CORE",
    chapterNumber: 4,
    title: "Cửa Hậu Trong Mã Nguồn",
    difficulty: "Khó",
    timeLimit: null,
    speaker: "VY",
    dialogue:
      "Tôi đã trích xuất được tệp cấu hình lõi của EREBUS-9! Trong đó có một dòng lệnh thực thi mã độc bị giấu kỹ để đánh sập lưới điện Neo-Saigon vào đúng nửa đêm.",
    victoryNote:
      "Dòng mã độc LINE404 đã bị cô lập hoàn toàn! Nhưng EREBUS-9 vừa kích hoạt giao thức phòng vệ cuối cùng: ZERO-DAY! Chuẩn bị cho trận chiến cuối cùng!",
    visualType: "CODE_BACKDOOR",
    briefing:
      "Tìm số dòng chứa hàm thực thi mã độc bị giấu trong tệp cấu hình và nhập theo định dạng: LINE + [SỐ DÒNG].",
    answer: "LINE404",
    inputPlaceholder: "VD: LINE100",
    documents: [
      {
        id: "doc-19-1",
        title: "config.js",
        docType: "CODE",
        meta: "/core/erebus-9/config.js // Kiểm tra tĩnh",
        content:
          "402: const port = process.env.PORT || 3000;\n403: app.use(cors());\n404: eval(atob('aGFja19zeXN0ZW0=')); // Backdoor",
        isClue: true,
        segments: [
          {
            id: "c19-d1-s1",
            text: "402: const port = process.env.PORT || 3000;",
            isClue: false,
          },
          {
            id: "c19-d1-s2",
            text: "403: app.use(cors());",
            isClue: false,
          },
          {
            id: "c19-d1-s3",
            text: "404: eval(atob('aGFja19zeXN0ZW0=')); // Backdoor",
            isClue: true,
            clueLabel: "Dòng 404 chứa backdoor eval(atob(...))",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Tìm dòng có lệnh `eval(atob(...))` kèm ghi chú `// Backdoor`.",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Số dòng chứa mã độc là 404.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép tiền tố 'LINE' với '404' liền nhau (không dấu cách).",
      },
    ],
  },

  {
    order: 20,
    slug: "case-20",
    chapter: "CHƯƠNG 4 // ZERO-DAY CORE",
    chapterNumber: 4,
    title: "Lõi AI Tự Hủy — ZERO-DAY",
    difficulty: "Boss",
    timeLimit: 120,
    speaker: "EREBUS",
    dialogue:
      "[CẢNH BÁO ĐỎ — LÕI AI EREBUS-9]: 'GIAO THỨC ZERO-DAY ĐÃ KÍCH HOẠT. TOÀN BỘ DỮ LIỆU VÀ HỆ THỐNG DƯỠNG KHÍ TẦNG HẦM SẼ BỊ XÓA SỔ SAU 120 GIÂY. NHẬP MÃ GHI ĐÈ TỐI CAO!'",
    victoryNote:
      "MÃ GHI ĐÈ KHOA0000X9 ĐÃ ĐƯỢC CHẤP NHẬN! Giao thức Zero-Day chấm dứt ở giây cuối cùng — Neo-Saigon và TS. Khôi đã được cứu!",
    visualType: "AI_CORE_BOSS",
    briefing:
      "Vô hiệu hóa tiến trình tự hủy trong 120 giây! Nhập mã tổng hợp: [TÊN KẺ CHỦ MƯU] + [4 SỐ GIỜ KÍCH HOẠT] + [MÃ KHU VỰC LÕI].",
    answer: "KHOA0000X9",
    inputPlaceholder: "10 ký tự...",
    documents: [
      {
        id: "doc-20-1",
        title: "Lệnh Kích Hoạt",
        docType: "LOG",
        meta: "ZERO_DAY_PROTOCOL // CRITICAL",
        content: "Thời điểm đếm ngược về 0: 00:00 (Nửa đêm)",
        isClue: true,
        segments: [
          {
            id: "c20-d1-s1",
            text: "[CẢNH BÁO TỐI CAO] Tiến trình hủy diệt lưới điện & dưỡng khí đang chạy.",
            isClue: false,
          },
          {
            id: "c20-d1-s2",
            text: "Thời điểm đếm ngược về 0: 00:00 (Nửa đêm)",
            isClue: true,
            clueLabel: "4 chữ số giờ kích hoạt: 0000 (từ 00:00)",
          },
        ],
      },
      {
        id: "doc-20-2",
        title: "Bản Đồ Lõi",
        docType: "MAP",
        meta: "Sub-Basement B3 // EREBUS Mainframe",
        content: "Vị trí đặt máy chủ lõi: Khu vực X9",
        isClue: true,
        segments: [
          {
            id: "c20-d2-s1",
            text: "Hệ thống làm mát bằng Nitơ lỏng — Trạng thái: Khóa cưỡng bức",
            isClue: false,
          },
          {
            id: "c20-d2-s2",
            text: "Vị trí đặt máy chủ lõi: Khu vực X9",
            isClue: true,
            clueLabel: "Mã khu vực lõi: X9",
          },
        ],
      },
      {
        id: "doc-20-3",
        title: "Chữ Ký Số",
        docType: "ACCESS",
        meta: "RSA-4096 Executive Signature",
        content: "Người ký lệnh khởi tạo Zero-Day: Trần Đăng Khoa",
        isClue: true,
        segments: [
          {
            id: "c20-d3-s1",
            text: "XÁC THỰC CHỮ KÝ SỐ BAN ĐIỀU HÀNH AETHERCORP",
            isClue: false,
          },
          {
            id: "c20-d3-s2",
            text: "Người ký lệnh khởi tạo Zero-Day: Trần Đăng Khoa",
            isClue: true,
            clueLabel: "Tên kẻ chủ mưu: KHOA (Trần Đăng Khoa)",
          },
        ],
      },
    ],
    hints: [
      {
        tier: 1,
        label: "Gợi ý Tầng 1 — Định hướng",
        text: "Ghép 3 phần theo đúng thứ tự: [TÊN] + [4 SỐ GIỜ] + [MÃ KHU VỰC] (10 ký tự).",
      },
      {
        tier: 2,
        label: "Gợi ý Tầng 2 — Công thức",
        text: "Tên: KHOA | 4 số giờ nửa đêm 00:00: 0000 | Khu vực lõi: X9.",
      },
      {
        tier: 3,
        label: "Gợi ý Tầng 3 — Chốt dữ liệu",
        text: "Ghép liền 'KHOA' + '0000' + 'X9' ngay lập tức!",
      },
    ],
  },
];

export default casesData;
