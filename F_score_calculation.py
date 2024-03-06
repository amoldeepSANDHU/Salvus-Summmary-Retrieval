def calculate_f_score(model_summary, gold_summary):
    # Convert summaries to sets of words for easy comparison
    model_set = set(model_summary.split())
    gold_set = set(gold_summary.split())

    # Calculate precision, recall, and F-score
    # Precision = (Number of common words between model and gold summary) / (Number of words in the model summary)
    precision = len(model_set.intersection(gold_set)) / len(model_set)

    # Recall = (Number of common words between model and gold summary) / (Number of words in the gold summary)
    recall = len(model_set.intersection(gold_set)) / len(gold_set)

    # F-score = 2 * (Precision * Recall) / (Precision + Recall)
    if precision + recall == 0:
        f_score = 0.0
    else:
        f_score = 2 * (precision * recall) / (precision + recall)

    return f_score

# Example usage:
model_summary_A = "Yet, as AI continues to evolve, ethical considerations emerge. Issues surrounding privacy, data security, and algorithmic bias demand stringent governance to ensure AI systems uphold fairness, transparency, and accountability. As the boundaries of AI expand, researchers and practitioners must balance technological advancement with ethical stewardship. Responsible AI development entails collaboration, diverse perspectives, and societal engagement to harness AI's potential for inclusive, sustainable, and human-centric outcomes. Emphasizing ethical AI will ensure that we unlock the immense benefits of this transformative technology while mitigating potential risks."
gold_summary = "Artificial Intelligence (AI) stands at the forefront of technological advancements, representing a profound leap in the quest for intelligent machines.  Issues surrounding privacy, data security, and algorithmic bias demand stringent governance to ensure AI systems uphold fairness, transparency, and accountability.  As the boundaries of AI expand, researchers and practitioners must balance technological advancement with ethical stewardship. Responsible AI development entails collaboration, diverse perspectives, and societal engagement to harness AI's potential for inclusive, sustainable, and human-centric outcomes.  Emphasizing ethical AI will ensure that we unlock the immense benefits of this transformative technology while mitigating potential risks."

f_score_A = calculate_f_score(model_summary_A, gold_summary)
print("F-score for Model A:", f_score_A)
