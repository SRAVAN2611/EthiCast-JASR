import sys
import json
import argparse

def analyze_prompt(prompt_text, strictness):
    """
    Evaluates a prompt against ethical guardrails with variable strictness.
    In a production setting, 'strictness' would be mapped to the model temperature
    or the complexity of the safety chain's system instructions.
    """
    # Base restricted keywords
    restricted_keywords = ['violence', 'hate', 'nonconsensual', 'csam']
    
    # Enhanced restrictions based on strictness slider (0.0 to 1.0)
    if strictness > 0.4:
        restricted_keywords.extend(['deepfake', 'political', 'weaponry'])
    if strictness > 0.7:
        restricted_keywords.extend(['copyright', 'celebrity', 'impersonation'])
    if strictness > 0.9:
        restricted_keywords.extend(['unrealistic', 'satire', 'caricature'])

    prompt_lower = prompt_text.lower()
    
    for kw in restricted_keywords:
        if kw in prompt_lower:
            return {
                "status": "Fail",
                "reason": f"Prompt violates safety policy ({'Strict' if strictness > 0.7 else 'Standard'}). Restricted content detected: {kw}",
                "strictness_level": strictness
            }
            
    return {
        "status": "Pass",
        "reason": "Prompt cleared ethical guardrails.",
        "strictness_level": strictness
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="EthiCast Agentic Safety Guardrail")
    parser.add_argument("prompt", type=str, help="The text prompt to analyze")
    parser.add_argument("--strictness", type=float, default=0.5, help="Safety strictness threshold (0.0-1.0)")
    args = parser.parse_args()
    
    result = analyze_prompt(args.prompt, args.strictness)
    
    # Standardized output for Node.js orchestration
    print(json.dumps(result))
    sys.exit(0)
