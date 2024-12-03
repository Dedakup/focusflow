import backgroundReducer, {
  setBackgrounds,
  selectBackground,
  selectBackgrounds,
  selectSelectedBackground,
} from './backgroundSlice';
import backgroundsData from '../assets/backgrounds.json';
import { BackgroundState } from '../types';
import { RootState } from '@store';

describe('Background Slice', () => {
  // Initial state for testing
  const initialState: BackgroundState = {
      backgrounds: backgroundsData,
      selectedBackground: backgroundsData[0],
  };

  // Test initial state
  describe('Initial State', () => {
      it('should return the initial state', () => {
          const state = backgroundReducer(undefined, { type: 'unknown' });
          expect(state).toEqual(initialState);
      });
  });

  // Test reducers
  describe('Reducers', () => {
      it('should handle setBackgrounds', () => {
          const newBackgrounds = [
              {
                  id: 'test-1',
                  title: 'Test Background 1',
                  url: 'https://example.com/test1.mp4',
                  thumbnail: 'https://example.com/test1.jpg',
              },
              {
                  id: 'test-2',
                  title: 'Test Background 2',
                  url: 'https://example.com/test2.mp4',
                  thumbnail: 'https://example.com/test2.jpg',
              },
          ];

          const state = backgroundReducer(initialState, setBackgrounds(newBackgrounds));
          expect(state.backgrounds).toEqual(newBackgrounds);
      });

      it('should handle selectBackground', () => {
          const newSelectedBackground = {
              id: 'test-1',
              title: 'Test Background 1',
              url: 'https://example.com/test1.mp4',
              thumbnail: 'https://example.com/test1.jpg',
          };

          const state = backgroundReducer(
              initialState,
              selectBackground(newSelectedBackground)
          );
          expect(state.selectedBackground).toEqual(newSelectedBackground);
      });
  });

  // Test selectors
  describe('Selectors', () => {
      const mockRootState = {
          api: { queries: {}, mutations: {}, provided: {}, subscriptions: {}, config: {} },
          auth: { user: null, token: null, isLoading: false, isAuthenticated: false },
          background: initialState,
      } as RootState;

      it('should select backgrounds', () => {
          const backgrounds = selectBackgrounds(mockRootState);
          expect(backgrounds).toEqual(initialState.backgrounds);
      });

      it('should select selected background', () => {
          const selectedBackground = selectSelectedBackground(mockRootState);
          expect(selectedBackground).toEqual(initialState.selectedBackground);
      });
  });

  // Test edge cases
  describe('Edge Cases', () => {
      it('should handle empty backgrounds array', () => {
          const state = backgroundReducer(
              initialState,
              setBackgrounds([])
          );
          expect(state.backgrounds).toEqual([]);
      });

      it('should handle null selected background', () => {
          const state = backgroundReducer(
              initialState,
              selectBackground(null)
          );
          expect(state.selectedBackground).toBeNull();
      });

      it('should preserve other state properties when updating backgrounds', () => {
          const newBackgrounds = [
              {
                  id: 'test-1',
                  title: 'Test Background 1',
                  url: 'https://example.com/test1.mp4',
                  thumbnail: 'https://example.com/test1.jpg',
              },
          ];

          const state = backgroundReducer(initialState, setBackgrounds(newBackgrounds));
          expect(state.selectedBackground).toEqual(initialState.selectedBackground);
      });
  });
});