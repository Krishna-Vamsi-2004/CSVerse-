/**
 * TOPIC CONTENT REGISTRY
 * Comprehensive learning content for all topics across modules
 * Each topic has: theory, visuals, patterns, and practice questions
 */

import { DATA_STRUCTURES_CONTENT } from './dsaTopics/dataStructures.js';
import { ALGORITHMS_CONTENT } from './dsaTopics/algorithms.js';
import { TECHNIQUES_CONTENT } from './dsaTopics/techniques.js';

// ═══════════════════════════════════════════════════════════════════════════
// DSA CONTENT - ALL 33 TOPICS
// ═══════════════════════════════════════════════════════════════════════════

export const DSA_CONTENT = {
  ...DATA_STRUCTURES_CONTENT,
  ...ALGORITHMS_CONTENT,
  ...TECHNIQUES_CONTENT,
};

/**
 * Get content for a specific topic
 * @param {string} moduleId
 * @param {string} topicId
 */
export function getTopicContent(moduleId, topicId) {
  if (moduleId === 'dsa') {
    return DSA_CONTENT[topicId] || null;
  }
  // Add other modules as they're developed
  return null;
}

/**
 * Check if topic has full content available
 * @param {string} moduleId
 * @param {string} topicId
 */
export function hasTopicContent(moduleId, topicId) {
  return getTopicContent(moduleId, topicId) !== null;
}
