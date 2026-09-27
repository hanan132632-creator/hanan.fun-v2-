export interface EgyptGovernorate {
  id: string;
  nameAr: string;
  nameEn: string;
  capitalAr: string;
  capitalEn: string;
  region: 'greater_cairo' | 'alexandria' | 'delta' | 'canal' | 'upper_egypt' | 'frontier';
  regionAr: string;
  regionEn: string;
  cdnLatencyMs: number;
}

export const EGYPT_GOVERNORATES: EgyptGovernorate[] = [
  // Greater Cairo (إقليم القاهرة الكبرى)
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', capitalAr: 'القاهرة', capitalEn: 'Cairo', region: 'greater_cairo', regionAr: 'القاهرة الكبرى', regionEn: 'Greater Cairo', cdnLatencyMs: 12 },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', capitalAr: 'الجيزة', capitalEn: 'Giza', region: 'greater_cairo', regionAr: 'القاهرة الكبرى', regionEn: 'Greater Cairo', cdnLatencyMs: 14 },
  { id: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', capitalAr: 'بنها', capitalEn: 'Banha', region: 'greater_cairo', regionAr: 'القاهرة الكبرى', regionEn: 'Greater Cairo', cdnLatencyMs: 15 },

  // Alexandria & North Coast (إقليم الإسكندرية والساحل الشمالي)
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', capitalAr: 'الإسكندرية', capitalEn: 'Alexandria', region: 'alexandria', regionAr: 'الإسكندرية والساحل', regionEn: 'Alexandria & Coast', cdnLatencyMs: 16 },
  { id: 'matrouh', nameAr: 'مطروح', nameEn: 'Matrouh', capitalAr: 'مرسى مطروح', capitalEn: 'Marsa Matrouh', region: 'alexandria', regionAr: 'الإسكندرية والساحل', regionEn: 'Alexandria & Coast', cdnLatencyMs: 22 },
  { id: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', capitalAr: 'دمنهور', capitalEn: 'Damanhour', region: 'alexandria', regionAr: 'الإسكندرية والساحل', regionEn: 'Alexandria & Coast', cdnLatencyMs: 18 },

  // Delta Region (إقليم الدلتا)
  { id: 'dakahlia', nameAr: 'الدقهلية', nameEn: 'Dakahlia', capitalAr: 'المنصورة', capitalEn: 'Mansoura', region: 'delta', regionAr: 'وسط وشمال الدلتا', regionEn: 'Delta', cdnLatencyMs: 16 },
  { id: 'sharqia', nameAr: 'الشرقية', nameEn: 'Sharqia', capitalAr: 'الزقازيق', capitalEn: 'Zagazig', region: 'delta', regionAr: 'وسط وشمال الدلتا', regionEn: 'Delta', cdnLatencyMs: 16 },
  { id: 'gharbia', nameAr: 'الغربية', nameEn: 'Gharbia', capitalAr: 'طنطا', capitalEn: 'Tanta', region: 'delta', regionAr: 'وسط وشمال الدلتا', regionEn: 'Delta', cdnLatencyMs: 17 },
  { id: 'menofia', nameAr: 'المنوفية', nameEn: 'Menofia', capitalAr: 'شبين الكوم', capitalEn: 'Shibin El Kom', region: 'delta', regionAr: 'وسط وشمال الدلتا', regionEn: 'Delta', cdnLatencyMs: 17 },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', capitalAr: 'كفر الشيخ', capitalEn: 'Kafr El Sheikh', region: 'delta', regionAr: 'وسط وشمال الدلتا', regionEn: 'Delta', cdnLatencyMs: 19 },
  { id: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', capitalAr: 'دمياط', capitalEn: 'Damietta', region: 'delta', regionAr: 'وسط وشمال الدلتا', regionEn: 'Delta', cdnLatencyMs: 18 },

  // Canal Region (إقليم القناة)
  { id: 'port_said', nameAr: 'بورسعيد', nameEn: 'Port Said', capitalAr: 'بورسعيد', capitalEn: 'Port Said', region: 'canal', regionAr: 'إقليم القناة', regionEn: 'Suez Canal', cdnLatencyMs: 17 },
  { id: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', capitalAr: 'الإسماعيلية', capitalEn: 'Ismailia', region: 'canal', regionAr: 'إقليم القناة', regionEn: 'Suez Canal', cdnLatencyMs: 16 },
  { id: 'suez', nameAr: 'السويس', nameEn: 'Suez', capitalAr: 'السويس', capitalEn: 'Suez', region: 'canal', regionAr: 'إقليم القناة', regionEn: 'Suez Canal', cdnLatencyMs: 18 },

  // Upper Egypt (إقليم صعيد مصر)
  { id: 'fayoum', nameAr: 'الفيوم', nameEn: 'Fayoum', capitalAr: 'الفيوم', capitalEn: 'Fayoum', region: 'upper_egypt', regionAr: 'شمال ووسط الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 19 },
  { id: 'beni_suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', capitalAr: 'بني سويف', capitalEn: 'Beni Suef', region: 'upper_egypt', regionAr: 'شمال ووسط الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 20 },
  { id: 'minya', nameAr: 'المنيا', nameEn: 'Minya', capitalAr: 'المنيا', capitalEn: 'Minya', region: 'upper_egypt', regionAr: 'شمال ووسط الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 21 },
  { id: 'assiut', nameAr: 'أسيوط', nameEn: 'Assiut', capitalAr: 'أسيوط', capitalEn: 'Assiut', region: 'upper_egypt', regionAr: 'شمال ووسط الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 23 },
  { id: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', capitalAr: 'سوهاج', capitalEn: 'Sohag', region: 'upper_egypt', regionAr: 'جنوب الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 24 },
  { id: 'qena', nameAr: 'قنا', nameEn: 'Qena', capitalAr: 'قنا', capitalEn: 'Qena', region: 'upper_egypt', regionAr: 'جنوب الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 25 },
  { id: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', capitalAr: 'الأقصر', capitalEn: 'Luxor', region: 'upper_egypt', regionAr: 'جنوب الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 26 },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', capitalAr: 'أسوان', capitalEn: 'Aswan', region: 'upper_egypt', regionAr: 'جنوب الصعيد', regionEn: 'Upper Egypt', cdnLatencyMs: 27 },

  // Frontier & Red Sea / Sinai (المحافظات الحدودية والبحر الأحمر وسيناء)
  { id: 'red_sea', nameAr: 'البحر الأحمر', nameEn: 'Red Sea', capitalAr: 'الغردقة', capitalEn: 'Hurghada', region: 'frontier', regionAr: 'البحر الأحمر وسيناء', regionEn: 'Red Sea & Sinai', cdnLatencyMs: 22 },
  { id: 'south_sinai', nameAr: 'جنوب سيناء', nameEn: 'South Sinai', capitalAr: 'طور سيناء / شرم الشيخ', capitalEn: 'Sharm El Sheikh', region: 'frontier', regionAr: 'البحر الأحمر وسيناء', regionEn: 'Red Sea & Sinai', cdnLatencyMs: 23 },
  { id: 'north_sinai', nameAr: 'شمال سيناء', nameEn: 'North Sinai', capitalAr: 'العريش', capitalEn: 'Arish', region: 'frontier', regionAr: 'البحر الأحمر وسيناء', regionEn: 'Red Sea & Sinai', cdnLatencyMs: 24 },
  { id: 'new_valley', nameAr: 'الوادي الجديد', nameEn: 'New Valley', capitalAr: 'الخارجة', capitalEn: 'Kharga', region: 'frontier', regionAr: 'المحافظات الحدودية', regionEn: 'Frontier', cdnLatencyMs: 28 },
];
