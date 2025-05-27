import CustomerServices from "../components/CustomerServices.js";
import CustomerSerHistory from "../components/CustomerSerHistory.js";
import CustomerProfile from "../components/CustomerProfile.js";

export default {
  components: {
    CustomerServices,
    CustomerSerHistory,
    CustomerProfile,
  },

  template: `
    <div class="customer">
      <div class="dashboard">
        <div class="section">
          <h2>Profile</h2>
          <CustomerProfile />
        </div>
        <div class="section">
          <h2>Looking for?</h2>
          <CustomerServices />
        </div>
        <div class="section">
          <h2>Service History</h2>
          <CustomerSerHistory />
        </div>

        <!-- AI Chat Icon -->
        <img
          src="/static/ai_logo.png"
          width="60px"
          alt="ai logo"
          data-bs-toggle="modal"
          data-bs-target="#chatModal"
          style="cursor: pointer;"
        />

        <!-- Bootstrap Chat Modal -->
        <div class="modal fade" id="chatModal" tabindex="-1" aria-labelledby="chatModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="chatModalLabel">AI Support</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div class="modal-body">
                <!-- Chat UI -->
                <div class="chat-window" style="max-height: 400px; overflow-y: auto;">
                  <div
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="['p-2 rounded my-2', message.sender === 'user' ? 'bg-primary text-white text-end' : 'bg-light']"
                  >
                    {{ message.text }}
                  </div>
                  <!-- Show loading state -->
                  <div v-if="loading" class="text-center p-2">AI is typing...</div>
                </div>
              </div>

              <div class="modal-footer">
                <input
                  v-model="userMessage"
                  @keydown.enter="sendMessage"
                  type="text"
                  class="form-control me-2"
                  placeholder="Type your message..."
                />
                <button class="btn btn-info" @click="sendMessage">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      userMessage: "",
      messages: [],
      loading: false,  // Loading state
    };
  },

  methods: {
    async sendMessage() {
      if (this.userMessage.trim()) {
        // User message
        this.messages.push({ text: this.userMessage, sender: "user" });

        // Show loading state
        this.loading = true;

        // Get AI response
        const reply = await this.getAIResponse(this.userMessage);

        // Add AI response to the messages array
        this.messages.push({ text: reply, sender: "ai" });

        // Hide loading state
        this.loading = false;

        // Clear input field
        this.userMessage = "";

        // Scroll to the bottom
        this.$nextTick(() => {
          const chatWindow = document.querySelector(".chat-window");
          chatWindow.scrollTop = chatWindow.scrollHeight;
        });
      }
    },

    async getAIResponse(input) {
      try {
        const res = await fetch(location.origin + '/chat', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        });

        const data = await res.json();
        return data.reply || "Sorry, I didn't quite catch that.";
      } catch (err) {
        console.error("Error:", err);
        return "Server error. Try again later.";
      }
    },
  },
};





// import CustomerServices from "../components/CustomerServices.js";
// import CustomerSerHistory from "../components/CustomerSerHistory.js";
// import CustomerProfile from "../components/CustomerProfile.js";

// export default {
//     components: {
//         CustomerServices,
//         CustomerSerHistory,
//         CustomerProfile,
//     },
//     template: `
//             <div class="customer">
//             <div class="dashboard">
//                 <div class="section">
//                 <h2>Profile</h2>
//                   <CustomerProfile/>
//                 </div>
//                 <div class="section">
//                     <h2>Looking for?</h2>
//                     <CustomerServices/>
//                 </div>
//                 <div class="section">
//                 <h2>Service History</h2>
//                 <CustomerSerHistory/>
//                 </div>
//             </div>
//             </div>
//     `,
// };
