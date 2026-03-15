use napi_derive::napi;
use ropey::Rope;

#[napi]
pub struct RopeBuffer {
    rope: Rope,
}

#[napi]
impl RopeBuffer {
    #[napi(constructor)]
    pub fn new(text: String) -> Self {
        Self {
            rope: Rope::from_str(&text),
        }
    }

    #[napi]
    pub fn insert(&mut self, char_idx: u32, text: String) {
        self.rope.insert(char_idx as usize, &text);
    }

    #[napi]
    pub fn delete(&mut self, start: u32, end: u32) {
        if (start as usize) < (end as usize) && (end as usize) <= self.rope.len_chars() {
            self.rope.remove((start as usize)..(end as usize));
        }
    }

    #[napi]
    pub fn get_line(&self, line_idx: u32) -> Option<String> {
        self.rope.get_line(line_idx as usize).map(|l| l.to_string())
    }

    #[napi]
    pub fn len_lines(&self) -> u32 {
        self.rope.len_lines() as u32
    }

    // NEW: Fast full text retrieval from Rust side
    #[napi]
    pub fn get_text(&self) -> String {
        self.rope.to_string()
    }

    // NEW: Proper cloning of the rope structure
    #[napi]
    pub fn clone_buffer(&self) -> Self {
        Self {
            rope: self.rope.clone(),
        }
    }
}
