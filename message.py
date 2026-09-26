import math

class QuantumBraidBackend:
    def __init__(self):
        # The quantum state vector [State_0, State_1]
        # We start fully in State 0 (e.g., 100% probability)
        self.quantum_state = [1.0, 0.0]

        # Fibonacci Anyon Braid Matrix constants
        # Golden ratio approximation for topological physics
        self.tau = (math.sqrt(5.0) - 1.0) / 2.0

    def apply_braid_crossing(self, lane_index: int, is_over: bool):
        """
        Call this function whenever the player makes a braid crossing.
        :param lane_index: The lane where the crossing happened (e.g., 1 or 2)
        :param is_over: True if crossing over, False if crossing under
        """
        new_state = [0.0, 0.0]

        if lane_index == 1:
            # Crossing 1 introduces a quantum phase shift (R-Matrix)
            phase = 1.0 if is_over else -1.0
            
            # Mathematically rotates the quantum phase
            new_state[0] = self.quantum_state[0] * math.cos(phase) - self.quantum_state[1] * math.sin(phase)
            new_state[1] = self.quantum_state[0] * math.sin(phase) + self.quantum_state[1] * math.cos(phase)
            
        else:  # lane_index == 2
            # Crossing 2 performs a basis change (F-Matrix transformation)
            # This mixes the states together, creating true quantum superposition!
            s = math.sqrt(self.tau)
            
            if is_over:
                new_state[0] = (self.tau * self.quantum_state[0]) + (s * self.quantum_state[1])
                new_state[1] = (s * self.quantum_state[0]) - (self.tau * self.quantum_state[1])
            else:
                new_state[0] = (self.tau * self.quantum_state[0]) - (s * self.quantum_state[1])
                new_state[1] = (s * self.quantum_state[0]) + (self.tau * self.quantum_state[1])

        # Normalize the vector to maintain quantum probability conservation (must equal 1.0)
        magnitude = math.sqrt(new_state[0]**2 + new_state[1]**2)
        
        if magnitude > 0:
            self.quantum_state[0] = new_state[0] / magnitude
            self.quantum_state[1] = new_state[1] / magnitude

        print(f"Current Quantum State: [{self.quantum_state[0]:.2f}, {self.quantum_state[1]:.2f}]")

    def measure_final_state(self) -> dict:
        """
        Call this at the end of the level to calculate the player's results.
        """
        # Probability is the square of the absolute amplitude
        prob_state_0 = self.quantum_state[0] ** 2
        prob_state_1 = self.quantum_state[1] ** 2

        return {
            "Success_Energy": prob_state_0,
            "Decoherence_Glitch": prob_state_1
        }


# ==========================================
# EXAMPLE USAGE (How to run it in your game)
# ==========================================
if __name__ == "__main__":
    sim = QuantumBraidBackend()
    
    print("Level Starts!")
    # Simulating a player making 3 rapid moves:
    sim.apply_braid_crossing(lane_index=1, is_over=True)
    sim.apply_braid_crossing(lane_index=2, is_over=False)
    sim.apply_braid_crossing(lane_index=1, is_over=True)
    
    # Check results at the finish line
    results = sim.measure_final_state()
    print("\nFinal Level Results:")
    print(f"Success Energy: {results['Success_Energy'] * 100:.1f}%")
    print(f"Glitch Rate: {results['Decoherence_Glitch'] * 100:.1f}%")
